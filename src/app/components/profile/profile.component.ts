import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Post} from '../../models/post';
import {User} from '../../models/user';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers:[PostService,UserService]
})
export class ProfileComponent implements OnInit {
	
	public url;
	public posts: Array<Post>;
	public user:User;
	public identity;
	public token;

	constructor(
		private _postService:PostService,
		private _userService:UserService,
		private _route:ActivatedRoute,
		private _router:Router
		){
		
		this.url = global.url;
		this.identity=this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.getPosts();
	}

	getUser(user_id){
		this._userService.getUser(user_id).subscribe(
			response=>{
				if(response.status=='success'){
					this.user = response.user;
					
				}
			},
			error=>{
				console.log(error);
			}
		);
	}

	//sacar todos mis posts es decir del usuario actual que se envia el id
	//por la url
	getPosts(){
		this._route.params.subscribe(params=>{

			let id = params['id'];
			this.getUser(id);
			this._userService.getPosts(id).subscribe(
				response=>{
					if(response.status=='success'){
						this.posts = response.posts;
						
					}
				},
				error=>{
					console.log(error);
				}
			);
		});	
	}

	deletePost(id){
		this._postService.delete(this.token,id).subscribe(
			response=>{
				this.getPosts();
			},
			error=>{
				console.log(error);
			}
			);
	}



}
