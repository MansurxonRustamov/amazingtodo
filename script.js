let controls = document.querySelectorAll(".controls")
	info = document.querySelectorAll('.item')
	infoClass = document.querySelectorAll('.info')
	createT = document.querySelector(".plus")
	createNone = document.querySelector(".createTobox")
	btnAdd = document.querySelector(".btnAdd")
	addInput = document.querySelector(".createNone input")
	resultTobox = document.querySelector(".resultTobox")

btnAdd.addEventListener("click",()=>{
	ritem1 = document.querySelectorAll(".item")
	taskinfo = {id:ritem1.length+1, name:addInput.value.trim(), status:"false"}
	if (addInput.value.trim() != ""){
		localStorage.setItem(`task${ritem1.length !=0 ? ritem1.length+1 : 1}`, JSON.stringify(taskinfo))
		ritem2()
	}else{alert("iltimos yozing")}
})


createT.addEventListener("click",()=>{
	if(createNone.classList.contains("open")){
		createNone.classList.remove("open")
		createNone.classList.add("close")
	}else{
		createNone.classList.add("open")
		createNone.classList.remove("close")
	}
	createT.classList.toggle("fa-plus")
	createT.classList.toggle("fa-minus")
})

function ritem2() {
	ritem = document.querySelectorAll(".item")
	let ritemDiv = document.createElement("div")
	ritemDiv.classList.add("item")
	ritemDiv.id =`task${ritem.length+1}`
	datJs = JSON.parse(localStorage.getItem(`task${ritem.length !=0 ? ritem.length+1 : 1}`))
	ritemDiv.innerHTML = `<input type="checkbox" ${datJs.status !="false"? "checked" : ""}  id="task${ritem.length+1}" class="checkmark"> <label for="${ritem.length+1}" >${datJs.name.slice(0, 26)}...</label> <div class="controls ">
					<span class="fa-light fa-copy copy"></span>
					<i class="fa-light fa-trash-can-xmark delete"></i>
				</div>`
	resultTobox.appendChild(ritemDiv)
}
function ritem3() {
	for(let ib = 0;  ib < 1000; ib++){
		let ritemDiv = document.createElement("div")
		ritemDiv.classList.add("item")
		datJs = JSON.parse(localStorage.getItem(`task${ib+1}`))
		ritemDiv.id =`task${ib+1}`
		ritemDiv.innerHTML = `<input ${datJs.status !="false"? "checked" : ""} type="checkbox"  id="task${ib+1}" class="checkmark" id="checkmark"> <label for="task${ib+1}" class="${datJs.status == "true" ? "infoLine" : ""}" >${datJs.name.slice(0, 26)}...</label> <div class="controls ">
					<span class="fa-light fa-copy copy"></span>
					<i class="fa-light fa-trash-can-xmark delete"></i>
				</div>`
		resultTobox.appendChild(ritemDiv)
	}
}
resultTobox.addEventListener("click", (e)=>{
	if(e.target.nodeName == "LABEL"){
		e.target.classList.toggle("infoLine")
		console.log(e.target.previousElementSibling)
		datJs1 = JSON.parse(localStorage.getItem(`${e.target.parentNode.id}`))

		if(e.target.previousElementSibling.checked ==false){
			e.target.previousElementSibling.checked = true
			taskinfo2 = {id:datJs1.id, name:datJs1.name, status:"true"}
		}else{
			e.target.previousElementSibling.checked = false
			taskinfo2 = {id:datJs1.id, name:datJs1.name, status:"false"}
		}
		localStorage.setItem(`${e.target.parentNode.id}`, JSON.stringify(taskinfo2))

	}else if(e.target.nodeName == "INPUT"){
		e.target.nextElementSibling.classList.toggle("infoLine")

		datJs1 = JSON.parse(localStorage.getItem(`${e.target.parentNode.id}`))
		if(e.target.checked ==true){
			taskinfo2 = {id:datJs1.id, name:datJs1.name, status:"true"}
		}else{
			taskinfo2 = {id:datJs1.id, name:datJs1.name, status:"false"}
		}
		
		localStorage.setItem(`${e.target.parentNode.id}`, JSON.stringify(taskinfo2))
	}else if(e.target.nodeName=="SPAN"){
		datJs1 = JSON.parse(localStorage.getItem(`${e.target.parentNode.parentNode.id}`))
		navigator.clipboard.writeText(datJs1.name);
		console.log(e.target.parentNode.parentNode.textContent)
		swal({
 			 icon: "success",
 			 text:"Text Copy"
		});
	}else if(e.target.nodeName == 'I'){
		alert("List O`chirilyapti")
		e.target.parentNode.parentNode.remove()
		console.dir(e.target.parentNode.parentNode.id)
		localStorage.removeItem(`${e.target.parentNode.parentNode.id}`)
	}
})


ritem3()





