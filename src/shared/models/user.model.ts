export interface User{
    uid: String;
    name: String;
    email: String;
    photoURL: String; 

    facebook_id: number;
    google_id: number;
    github_id: number;

    dateCreated: number;
    status: String;
}