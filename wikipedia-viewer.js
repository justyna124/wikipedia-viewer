
var searchIcon = document.getElementById('search-icon');
var icon = document.getElementById('icon');
var form = document.getElementById('form');
var randomPar = document.getElementById('random');
var input = document.getElementById('input');
searchIcon.addEventListener("click", toggle);
// window.addEventListener("click", search);
icon.addEventListener("click", toggle);

form.addEventListener('submit', search);

function toggle() {

    if (!searchIcon.classList.contains('show-input')) {
        form.classList.remove('show-icon');
        searchIcon.classList.add('show-input');

    } else {
        form.classList.add('show-icon');
        searchIcon.classList.remove('show-input');
    }

}

function search(e) {
    e.preventDefault();

    var inputValue = input.value;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${inputValue}&list=search&srsearch=${inputValue}&srprop=snippet&format=json&formatversion=2&origin=*&prop=info&inprop=url`)
        .then(resp => resp.json()
)
.then(data => {
        // console.log(data);
        showResult(data.query)
    // console.log(data.)
});
}

function showResult(data) {
    console.log(data);
    var container=document.getElementById('container');
    container.innerHTML='';

    for(var i=0; i<data.search.length;i++){
        var item = document.createElement('a');
        item.setAttribute("href", data.pages[i].fullurl);
        item.setAttribute('target', '_blank');
        item.classList.add('item');
        var title=document.createElement('h1');
        title.classList.add('title');
        title.appendChild(document.createTextNode(data.search[i].title));
        item.appendChild(title);
        var description=document.createElement('div');
        description.classList.add('description');
        description.innerHTML = data.search[i].snippet;
        item.appendChild(description);
        container.appendChild(item);
    }
}


