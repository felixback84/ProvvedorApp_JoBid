import { Injectable } from "@angular/core";
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { afDBUser } from "../app/app.module";
//import { EncriptyService } from './encripty.service';

@Injectable()
export class UserService {

	Users: any = [];
	afDBUser: AngularFireDatabase;
	constructor() {
		this.afDBUser = afDBUser;
	}
	/*  ----------------user  ----------------------*/
	public getUsers() {
		return this.afDBUser.list('/user');
	}

	public getUser(userId) {
		return this.afDBUser.object('/user/' + userId);
	}

	public getUserLogin(name: string, pwd: any) {
		return this.afDBUser.list('/user')
			.forEach((users) => {
				//console.log(users);
				return users.map(user => {
					// 	console.log(user);
					// 	console.log(user['user_email']);
					// 	console.log(user['user_name']);
					// 	console.log('KEY:'+user.$key);
					// console.log('EMAIL:'+user.user_email);
					// console.log('NAME:'+user.user_name);
					// console.log('PWD:'+user.user_password);
					// console.log('PWD2:'+pwd);
					if ((user['user_email'] == name) || (user['user_username'] == name)) {
						console.info('existeUser');
						if (user['user_password'] == pwd) {

							console.info('existeUserPwd');
							// estado = [{"status":true,"userId":user.$key,'userData':user}];
							return user;
						}
					}

				});
				//return users;
			});
		/* .subscribe( (users) => { 
			for (var key in users) {
				if(users[key]['user_email'] || users[key]['user_name'] ){
					if( (users[key]['user_email'] == name) && (users[key]['user_name'] == name) ){ 
						if(users[key]['user_password'] == pwd){
							estado = [{"status":true,"userId":key,'userData':users[key]}];
							return estado;
						}
					}
				}
			}
		}); */
	}

	public getUserexists(name: string, email: any) {
		return this.afDBUser.list('/user')
			.forEach((users) => {
				//console.log(users);
				return users.map(user => {
					// console.log(user);
					// console.log(email);
					// console.log(name);
					// console.log('EMAIL:'+user.user_email);
					// console.log('NAME:'+user.user_username);
					if ((user['user_email'] == email) || (user['user_username'] == name)) {
						console.log('existeUser getUserexists');
						return user;
					}
				});
				//return users;
			});
		/* .subscribe( (users) => { 
			for (var key in users) {
				if(users[key]['user_email'] || users[key]['user_name'] ){
					if( (users[key]['user_email'] == name) && (users[key]['user_name'] == name) ){ 
						if(users[key]['user_password'] == pwd){
							estado = [{"status":true,"userId":key,'userData':users[key]}];
							return estado;
						}
					}
				}
			}
		}); */
	}

	public updateUserPicture(userId: string, picture: string) {
		console.log(this.afDBUser.list('/user/' + userId));
		return this.afDBUser.object('/user/' + userId).set({ 'user_picture': picture });
	}
	public getUserEmail(email: string) {
		//let listUser:any;

		return this.afDBUser.list('/user')
			.subscribe((users) => {
				//console.log(users);
				users.forEach((user) => {
					if (user['user_email'] == email) {
						//console.log(user);
						return user;
					}
				});
			});
	}


	public getUserEmailPerfil(email: string) {
		return this.afDBUser.list('/user')
			.forEach((users) => {
				//console.log(users);
				return users.map(user => {
					if (user['user_email'] == email) {
						//console.log(user);
						return user;
					}
				});
			});
	}


	public newUser(userData: any = [], keyNew?: any) {
		let key = undefined;
		//default star
		let star = '3';
		console.log('key:' + key);
		console.log('keyNew:' + keyNew);
		if (keyNew && keyNew != null && keyNew != undefined) {
			keyUser = keyNew;
		} else {
			var d = new Date();
			key = d.getTime();
			var keyUser = "user_" + (key);
		}
		//console.log(newKeyAddres);
		let ObjAddress: any = [];
		let username = userData["username"];
		let password = userData["password"];
		//let password = this.encriptyService.GenerateEncripty(userData["password"]);
		let email = userData["email"];
		let name = userData["name"];
		let zipcode = userData["zipcode"];
		let state = userData["state"];
		let picture = '';
		if (userData['picture'] != undefined) {
			picture = userData['picture'];
		}
		//let verificacion = userData["verificacion"];
		let pais = userData["pais"];
		let direccion = userData["direccion"];
		let tel = userData["tel"];


		//console.log(userData);
		if ((userData['username']) && (userData['password']) && (userData['email'])) {
			if ((userData['username'] != undefined) && (userData['username'] != null) && (userData['password'] != undefined) && (userData['password'] != null) && (userData['email'] != undefined) && (userData['email'] != null)) {
				this.afDBUser.object('/user/' + keyUser).set({ "user_username": username, "user_password": password, "user_email": email, "user_name": name, "user_zipcode": zipcode, "user_state": state, "user_picture": picture, "user_pais": pais, "user_tel": tel, "user_star": star });
				ObjAddress.push({ "label": 'My Address', "name": direccion });
				this.newAddress(keyUser, ObjAddress);
				console.info('user create');
			}
		}
	}

	public setUserDB(userData: any = [], keyUser?: any) {
		//default star
		//console.log(newKeyAddres);
		//let ObjAddress: any = [];
		let username = userData["username"];
		let password = userData["password"];
		//let password = this.encriptyService.GenerateEncripty(userData["password"]);
		let email = userData["email"];
		let name = userData["name"];
		let zipcode = userData["zipcode"];
		let state = userData["state"];
		let picture = '';
		if (userData['picture'] != undefined) {
			picture = userData['picture'];
		}
		//let verificacion = userData["verificacion"];
		let pais = userData["pais"];
		//let direccion = userData["direccion"];
		let tel = userData["tel"];


		//console.log(userData);
		if ((userData['username']) && (userData['password']) && (userData['email'])) {
			if ((userData['username'] != undefined) && (userData['username'] != null) && (userData['password'] != undefined) && (userData['password'] != null) && (userData['email'] != undefined) && (userData['email'] != null)) {
				this.afDBUser.object('/user/' + keyUser + '/user_username').set(username);
				this.afDBUser.object('/user/' + keyUser + '/user_password').set(password);
				this.afDBUser.object('/user/' + keyUser + '/user_email').set(email);
				this.afDBUser.object('/user/' + keyUser + '/user_name').set(name);
				this.afDBUser.object('/user/' + keyUser + '/user_zipcode').set(zipcode);
				this.afDBUser.object('/user/' + keyUser + '/user_state').set(state);
				this.afDBUser.object('/user/' + keyUser + '/user_picture').set(picture);
				this.afDBUser.object('/user/' + keyUser + '/user_pais').set(pais);
				this.afDBUser.object('/user/' + keyUser + '/user_tel').set(tel);
				console.log(userData);
				console.info('user update');
			}
		}
	}

	public setComment(keyUser, Object, keyComment?) {
		let key = undefined;
		// console.log('key:'+key);
		console.log('keyNew:' + keyComment);
		if (keyComment && keyComment != null && keyComment != undefined) {
			keyComm = keyComment;
		} else {
			var d = new Date();
			key = d.getTime();
			var keyComm = "comm_" + (key);
		}

		console.log('comment');
		this.afDBUser.object('/user/' + keyUser + '/user_comments/' + keyComm).set({ 'comm_description': Object['comment'], 'comm_qualification': Object['estrellas'], 'provider_username': Object['providerId'] }).catch(() => console.log('error set commets'));
	}

	public setStar(keyUser, userStar) {
		this.afDBUser.object('/user/' + keyUser + '/user_star').set(userStar);
	}

	/*  ----------------user - address ----------------------*/
	public getAddress(userId: string = "") {
		//return this.afDBUser.list('/user/'+userId);
		//return this.afDBUser.object('/user/'+userId);
		return this.afDBUser.list('/user/' + userId + '/user_address/');
	}

	public newAddress(userId: string = "", ObjAddress: any = []) {
		var d = new Date();
		var key = d.getTime();
		// console.log(key);
		var keyAddress = "addr_" + key;
		let name = ObjAddress['0']['name'];
		let label = ObjAddress['0']['label'];
		// console.log(ObjAddress['0']);
		// console.log(ObjAddress['0']['label']);
		// console.log(name);
		// console.log(label);
		console.info('user  address create');
		if ((ObjAddress['0']['label']) && (ObjAddress['0']['name'])) {
			if ((label != undefined) && (label != null) && (name != undefined) && (name != null)) {
				return this.afDBUser.object('/user/' + userId + '/user_address/' + keyAddress).set({ "addr_label": label, "addr_info": name });
			}
		}
	}

}