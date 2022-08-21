"use strict"

var database;


function clone(obj) {
	// return $.extend(true, {}, obj);
	return JSON.parse(JSON.stringify(obj));
}


class Database {

	constructor(params={}) {
		this.connection = params['connection'];
		let schema;

		console.assert(params.hasOwnProperty('schema') || (params.hasOwnProperty('name') && params.hasOwnProperty('models')));

		if (params.hasOwnProperty('schema')) {
			schema = params['schema'];
		}
		else if (params.hasOwnProperty('name') && params.hasOwnProperty('models')) {
			schema = Database.getDbSchema(params);
		}
		else {
			console.log("Too few parameters to establish database connection.");
			return;
		}
		this.schema = schema;
		let isDbCreated = this.connection.initDb(schema);
		if(isDbCreated === true){
			console.log("Database created.");
		}
		else {
		}
	}

	// static connection;

	static getDbSchema(params) {

		console.assert(params.hasOwnProperty('name'));
		console.assert(params.hasOwnProperty('models'));

		let schema = {
			name: params['name'],
			tables: [],
		};

		for (let model of params['models']) {
			let columns = model.columns;
			schema['tables'].push({
				name: model.meta.table_name,
				columns: columns,
				version: model.meta.version,
			});
		}

		return schema;

	}

	async clear() {
		let confirmed = confirm("Are you sure you want to clear your database?");
		if (!confirmed) {
			return;
		}
		let schema = this.schema;
		for await (let table of schema.tables) {
			await this.connection.clear(table.name);
		}
		alert('Database cleared.');
		window.location.reload();
	}

	async drop() {
		let confirmed = confirm("Are you sure you want to delete your database?");
		if (!confirmed) {
			return;
		}
		this.connection.dropDb().then(function() {
			alert('Db deleted successfully');
			window.location.reload();
		}).catch(function(error) {
			console.log(error);
		});
	}

}


class QuerySet {

	constructor(kwargs={}) {
		this.kwargs = kwargs;
		this.table_name = kwargs['table_name'];
		this.model = kwargs['model'];
		this.where = (kwargs.hasOwnProperty('where') ? kwargs['where'] : {});
		this.order = (kwargs.hasOwnProperty('order') ? kwargs['order'] : []);
		this.database = (kwargs.hasOwnProperty('database') ? kwargs['database'] : database);
	}

	async *[Symbol.asyncIterator]() {

		let params = {
			from: this.table_name,
		};

		params['where'] = clone(this.where);;

		params['order'] = this.order;

		let boolean_params = {};
		let null_params = [];
		if (params.hasOwnProperty('where')) {
			for (let [key, value] of Object.entries(params['where'])) {
				if (typeof value === 'boolean') {
					boolean_params[key] = value;
					delete params['where'][key];
				}
				else if (value === null) {
					null_params.push(key);
					delete params['where'][key];
				}
			}
		}

		if (params.hasOwnProperty('where') && Object.keys(params['where']).length === 0) {
			delete params['where'];
		}
		if (params.hasOwnProperty('order') && Object.keys(params['order']).length === 0) {
			delete params['order'];
		}

		let results = await this.database.connection.select(params);

		results_loop:
		for (let result of results) {
			let skip = false;
			for (let [key, value] of Object.entries(boolean_params)) {
				if (result[key] !== value) {
					skip = true;
					continue results_loop;
					break;
				}
			}
			for (let key of null_params) {
				if (result[key] !== null) {
					skip = true;
					continue results_loop;
					break;
				}
			}
			if (skip) {
				continue;
			}
			if (!skip) {
				yield new this.model(result);
			}
		}
	}


	order_by(args=[]) {
		let order = [{
			by: "id",
			type: "desc",
		}];
		if (args) {
			order = [];
			for (let arg of args) {
				order.push({
					by: arg.replace("-", ""),
					type: (arg.startsWith("-") ? "desc":"asc"),
				});
			}
		}
		return new QuerySet({table_name:this.table_name, model:this.model, where:this.where, order:order});
	}

	async filter(kwargs={}) {
		if (this.kwargs.where !== Object) {
			this.kwargs.where = {};
		}
		this.kwargs.where = Object.assign({}, this.kwargs.where, kwargs);
		return new QuerySet(this.kwargs);
	}

	async first() {
		for await (let result of this) {
			return result;
			break;
		}
		return null;
	}

	async count() {
		let count = 0;
		for await (let result of this) {
			count += 1;
		}
		return count;
	}

	async length() {
		return await this.count();
	}

	async exists() {
		return (await this.count() > 0);
	}

	async list() {
		let results = [];
		for await (let result of this) {
			console.log(result);
			results.push(result);
		}
		return results;
	}

}

class Manager {

	constructor(params={}) {
		this.table_name = params['model'].meta.table_name;
		this.model = params['model'];
		this.database = database;
		if (params.hasOwnProperty('database')) {
			this.database = params['database'];
		}
	}

	async get(kwargs={}) {

		let table_name = this.table_name;

		let results = await this.database.connection.select({
			from: table_name,
			where: kwargs
		});

		if (!results || results.length == 0) {
			return null;
		}

		return new this.model(results[0]);

	}

	async using(database) {
		return new Manager({table_name:this.table_name, model:this.model, database:database});
	}

	async all() {

		return new QuerySet({table_name:this.table_name, model:this.model, where:true});

	}

	async filter(kwargs={}) {

		return new QuerySet({table_name:this.table_name, model:this.model, where:kwargs});

	}

	async create(kwargs={}) {

		let result = new this.model(kwargs);

		result = await result.save();

		return result;

	}

	async update(where={}, set={}) {

		let table_name = this.table_name;

		return await this.database.connection.update({
			in: table_name,
			set: set,
			where: where,
		});

	}

	async delete(kwargs={}) {

		let table_name = this.table_name;

		return await this.database.connection.remove({
			from: table_name,
			where: kwargs
		});

	}

	async get_or_create(where={}, defaults={}) {

		let result = await this.get(where);
		let created = false;

		if (!result) {
			result = await this.create(Object.assign({}, where, defaults));
			created = true;
		}

		return [result, created];

	}

	async update_or_create(where={}, defaults={}) {

		let result = await this.get(where);
		let created = null;

		if (result) {
			await this.update(where, defaults);
			result = await this.get(where);
			created = false;
		}
		else {
			// console.log(result);
			result = await this.create(Object.assign({}, where, defaults));
			created = true;
		}

		return [result, created];

	}

}

class Model {

	constructor(data={}) {
		let self = this;
		let model = this.constructor;
		if (data) {
			this.data = data;
		}
		for (let [key, value] of Object.entries(model.columns)) {
			console.assert(!self.hasOwnProperty(key), key + " is reserved and cannot be used as a field name.");
			Object.defineProperty (self, key, {
				get: function () {
					if (self.data.hasOwnProperty(key)) {
						return self.data[key];
					}
					return null;
				},
				set: function (new_value) {
					self.data[key] = new_value;
				}
			});
		}
	}

	static get objects() {
		return new Manager({model: this});
	}

	async save(params={}) {

		if (params.hasOwnProperty('using')) {
			database = params['using'];
		}
		
		if (this.data) {

			let model = this.constructor;

			for (let [key, value] of Object.entries(model.columns)) {
				if (value.dataType == 'date_time' && typeof this.data[key] === 'string') {
					this.data[key] = new Date(this.data[key]);
				}
			}

			if (model.columns.hasOwnProperty('uuid') && (!this.data.hasOwnProperty('uuid') || !this.data.uuid)) {
				this.data.uuid = uuid();
			}
			if (model.columns.hasOwnProperty('created') && (!this.data.hasOwnProperty('created') || !this.data.created)) {
				this.data.created = new Date();
			}
			if (model.columns.hasOwnProperty('modified')) {
				this.data.modified = new Date();
			}
			if (model.columns.hasOwnProperty('version')) {
				if (this.data.hasOwnProperty('version')) {
					this.data.version += 1;
				}
				else {
					this.data.version = 1;
				}
			}

			let results = await database.connection.insert({
				into: model.meta.table_name,
				values: [Object.assign({}, {id: this.data.id}, this.data)],
				upsert: true,
				return: true,
			});

			return new model(results[0]);

		}
	}

	delete() {
		this.constructor.objects.delete({
			id: this.data.id,
		});
	}

}