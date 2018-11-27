const db = require("../db").db
const query = require("../db/queries").user;

const checkUser = email => {
    const get = (resolve, reject) => {
      const queryCallback = async object => {
        try {
          const data = await object.one(query.check, [email]);
          resolve(data);
          object.done();
        } catch (e) {
          reject(e);
          object.done();
        }
      };
      db.connect().then(queryCallback).catch(e => reject(e));
    };
    return new Promise(get);
  };

const checkPassword = password => {
	const check = (resolve, reject) => {
		const queryCallback = async object => {
			try {
				const data = await object.one(query.password, [password]);
				resolve(data);
				object.done();
			} catch (e) {
				reject(e);
				object.done();
			}
		};
		db.connect().then(queryCallback).catch(e => reject(e));
	};
	return new Promise(check);
};


const create = (email, password) => {
	const add = (resolve, reject) => {
		const queryCallback = async object => {
			try {
				const data = await object.one(query.new, [email, password])
				resolve(data);
				object.done();
			} catch (e) {
			reject(e);
			object.done();
			}
		};
		db.connect().then(queryCallback).catch(e => reject(e));
	};
	return new Promise(add);
};

const checkBlacklist = jwt => {
	const checkJwt = (resolve, reject) => {
		const queryCallback = async object => {
			try {
				await object.one(query.blacklist, [jwt])
				resolve(true);
				object.done();
			} catch (e) {
				reject(false);
				object.done();
			}
		};
		db.connect().then(queryCallback).catch(e => reject(e));
	};
	return new Promise(checkJwt);  
}


const logOut = jwt => {
	const invalidateJwt = (resolve, reject) => {
		const queryCallback = async object => {
			try {
				await object.one(query.logOut, [jwt])
				resolve(data);
				object.done();
			} catch (e) {
				reject(e);
				object.done();
			}
		};
		db.connect().then(queryCallback).catch(e => reject(e));
	};
	return new Promise(invalidateJwt);  
}

const assignRole = (role, email) => {
	const assign = (resolve, reject) => {
		const queryCallback = async object => {
			try {
				const data = await object.one(query.assignRole, [role, email])
				resolve(data);
				object.done();
			} catch (e) {
				reject(e);
				object.done();
			}
		};
		db.connect().then(queryCallback).catch(e => reject(e));
	};
	return new Promise(assign)
}

module.exports = { checkUser, checkPassword, create, checkBlacklist, logOut, assignRole }
  