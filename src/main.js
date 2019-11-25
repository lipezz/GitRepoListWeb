import api from './api';

class App {
    
    constructor() {        
        this.users = [];
        this.form1 = document.getElementById('repoForm');
        this.input1 = document.querySelector('input[name=repoInput]');
        this.list1 = document.getElementById('repoList');
        this.registerHandlers();        
    }
    
    registerHandlers() {        
        this.form1.onsubmit = event => this.addRepository(event);        
    }
    
    setLoading(loading = true){        
        try {            
            if(loading === true){
                let loadingSpan = document.createElement('span');
                loadingSpan.appendChild(document.createTextNode('Loading...'));
                loadingSpan.setAttribute('id','loadingSpan');
                this.forml.appendChild(loadingSpan);
            
            } else {
                document.getElementById('loadingSpan').remove();
            }        

        } catch (error) {
            alert(error)
        }       
    }

    async addRepository(event) {
        
        event.preventDefault();

        const user = this.input1.value;
        
        if(user.length === 0)
            return;

        this.setLoading();

        try{
            //alert("CALLING https://api.github.com"+`/users/${user}`);

            const response = await api.get(`/users/${user}`);

            //alert(response.headers);

            const {name, avatar_url, followers, following, location} = response.data;
            
            this.users.push({ 
                name,
                avatar_url,
                followers,
                following,
                location,
            });

            this.input1.value = ''; 

            this.render();

        } catch (err) {
            alert('O repositorio não existe!');
        }

        //this.setLoading(false);        
    }
    
    render(){
        this.list1.innerHTML = ''; 

        this.users.forEach(repo => {

            let image = document.createElement('img');
            image.setAttribute('src', repo.avatar_url);

            let title = document.createElement('strong');
            title.appendChild(document.createTextNode(repo.name));            

            let followers = document.createElement('p');
            followers.appendChild(document.createTextNode(repo.followers));            

            let following = document.createElement('p');
            following.appendChild(document.createTextNode(repo.following));            

            let link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', repo.html_url);
            link.appendChild(document.createTextNode('Acessar'));            

            let listItem = document.createElement('li');
            listItem.appendChild(image);            
            listItem.appendChild(title);            
            listItem.appendChild(followers);            
            listItem.appendChild(following);            
            listItem.appendChild(location);            

            this.list1.appendChild(listItem);
        });
    }
}

new App();