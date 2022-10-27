let mainWraper=document.getElementById('post-wraperBlock');
let postOverlay=document.getElementById('overlay');
let overlayContent=document.getElementById('postcontent');
let overlayClose=document.getElementById('close');

// let url='http://jsonplaceholder.typicode.com/posts';



function ajax(url, callback){
    let requistPost=new XMLHttpRequest();
    requistPost.open('GET','http://jsonplaceholder.typicode.com/posts' );
    requistPost.addEventListener('load', function(){
        let response=requistPost.responseText;
        let dataresponse=JSON.parse(response);
       callback(dataresponse);

        dataresponse.forEach(item => {
            createPostrenderlogic(item);
        });
    });
    requistPost.send();

};

function createPostrenderlogic(item){
    const divWraper=document.createElement('div');
    divWraper.classList.add('posts');

    const h3post=document.createElement('h3');
    h3post.innerText=item.id;

    const h2post=document.createElement('h2');
    h2post.innerText=item.title;

    const deletebutton=document.createElement('button');
    deletebutton.classList.add('deletebutton');
    deletebutton.innerHTML="<i class='fa-solid fa-trash'></i>";

    divWraper.appendChild(h3post);
    divWraper.appendChild(h2post);
    divWraper.appendChild(deletebutton);
  


    mainWraper.appendChild(divWraper);

    overlayClose.addEventListener('click', function(){
        postOverlay.classList.remove('activeOverlay');
        overlayContent.innerHTML=" ";
    });

   divWraper.addEventListener('click', function (event) {
    const id= event.target.getAttribute('data-id');
    postOverlay.classList.add('activeOverlay');
    overlayClose.style.display='block';
    let url="http://jsonplaceholder.typicode.com/posts/${id}";
    ajax(url, function(dataresponse){
        let p=document.createElement('p');
        p.innerText=item.body;
        overlayContent.appendChild(p);
    })
   });
};
ajax("http://jsonplaceholder.typicode.com/posts", function(dataresponse){
    dataresponse.forEach(item=>{
        createPostrenderlogic(item);
    })
});