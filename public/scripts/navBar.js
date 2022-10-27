let categorySelected = document.querySelectorAll("#categorySelected")
let selected = document.querySelectorAll("#select")
user = JSON.parse(user)

const params = new URLSearchParams(window.location.search)
if(params.get("category")){
	const paramOptions = params.get("category").split('/')
	const arrayCategories = JSON.parse(categories)
	const categoryOption = document.getElementById("categoryOption")
	if(Number(paramOptions[0]) > arrayCategories[arrayCategories.length - 1].id){
		categoryOption.innerHTML = paramOptions[1]
		select.style.color =  "withe";
	}
	categorySelected = Array.from(categorySelected)
	let categoria = categorySelected.find(element => element.innerText == paramOptions[1])
	categoria.classList.add("seleccionado");
}


if(user.id !== 0){
	const dropMenu = document.querySelector('.btn-drop-menu');
	const emailMenu = document.querySelector('.email-menu');
	const logOut = document.getElementById('logOutBtn');
	dropMenu.addEventListener('click', ()=> {
		emailMenu.classList.toggle('show-hidden')
	})
	
	logOut.addEventListener('click', async() => {
		await fetch('http://localhost:3000/logout', {
			method: 'POST',
		})
		window.location.reload()
	})
}

categorySelected.forEach(element => {
	element.addEventListener("click", async () => {
		categorySelected.forEach(minCategory => {
			if (minCategory.getAttribute('value') != element.getAttribute('value')) {
				minCategory.classList.remove("seleccionado");
			}
		})

		element.classList.add("seleccionado")
});
});
