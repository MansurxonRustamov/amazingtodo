let controls = document.querySelectorAll(".controls")
	infoClass = document.querySelectorAll('.info')
	createT = document.querySelector(".plus")
	createNone = document.querySelector(".createTobox")
	btnAdd = document.querySelector(".btnAdd")
	addInput = document.querySelector(".createNone input")
	resultTobox = document.querySelector(".resultTobox")
	clearAll = document.querySelector(".clear button")
setTimeout(()=>{
	document.querySelector(".loaderBox1").style.display='none'
},2000)
swal.setActionValue({ confirm: 'Text from input' })

btnAdd.addEventListener("click",()=>{
	ritem1 = document.querySelectorAll(".item")
	taskinfo = {id:ritem1.length+1, name:addInput.value.trim(), status:"false"}
	if (addInput.value.trim() != ""){
		localStorage.setItem(`task${ritem1.length !=0 ? ritem1.length+1 : 1}`, JSON.stringify(taskinfo))
		swal({
			timer:2000,
 			 icon: "success",
 			 text:"List Yaratildi"
		});
		setTimeout(()=>{
			ritem2()
		},1000)
		addInput.value=""
		lenI1()

	}else{
		swal({
			timer:2000,
 			 icon: "error",
 			 text:"Avval Yozish talab qilinadi"
		});
	}
})
addInput.addEventListener("keyup", (e)=>{
	if(e.key=="Enter"){
		ritem1 = document.querySelectorAll(".item")
	taskinfo = {id:ritem1.length+1, name:addInput.value.trim(), status:"false"}
	if (addInput.value.trim() != ""){
		localStorage.setItem(`task${ritem1.length !=0 ? ritem1.length+1 : 1}`, JSON.stringify(taskinfo))
		swal({
			timer:2000,
 			 icon: "success",
 			 text:"List Yaratildi"
		});
		setTimeout(()=>{
			ritem2()
		},1000)
		addInput.value=""
		lenI1()


	}else{
		swal({
			timer:2000,
 			 icon: "error",
 			 text:"Avval Yozish talab qilinadi"
		});
	}
	}else{}
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
					<div class="fa-light fa-pen pen" id="pen"></div>
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
					<div class="fa-light fa-pen pen" id="pen"></div>
					<i class="fa-light fa-trash-can-xmark delete"></i>
				</div>`
		resultTobox.appendChild(ritemDiv)
	}
}
resultTobox.addEventListener("click", (e)=>{
	if(e.target.nodeName == "LABEL"){
		e.target.classList.toggle("infoLine")
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
		swal({
			timer:2000,
 			 icon: "success",
 			 text:"Text Copy"
		});
	}else if(e.target.nodeName == 'I'){
		swal({
			timer:2000,
 			 icon: "warning",
 			 text:"List O'chirlyapti....",
 			 closeModal:false,
 			 button: false
		});
		setTimeout(()=>{
			swal({
				timer:2000,
 			 icon: "success",
 			 text:"List O'chirildi"
		});
			e.target.parentNode.parentNode.remove()
		localStorage.removeItem(`${e.target.parentNode.parentNode.id}`)
		lenI1()
		},1000)
		

	}else if(e.target.id == "pen"){
		let editBox = document.querySelector(".editBox")
			backBtn = document.querySelector(".backBtn")
			editInput = document.querySelector(".editInput")
			saveBtn= document.querySelector(".saveBtn")
		editBox.style.transform = 'translateY(0)'

		datJs1 = JSON.parse(localStorage.getItem(`${e.target.parentNode.parentNode.id}`))
		editInput.value = datJs1.name

		

		saveBtn.addEventListener("click",()=>{
			taskinfo = {id:datJs1.id, name:editInput.value.trim(), status:datJs1.status}
			localStorage.setItem(`${e.target.parentNode.parentNode.id}`, JSON.stringify(taskinfo))
			console.log()
			e.target.parentNode.previousElementSibling.textContent = editInput.value.slice(0, 26) +"..."
			editBox.style.transform = 'translateY(-100%)'
			swal({
				timer:2000,
 			 icon: "success",
 			 text:"Successfully Change To Do list"
		});
		})

		backBtn.addEventListener("click", ()=>{
			editBox.style.transform = 'translateY(-100%)'
		})
	}
})
clearAll.addEventListener("click", ()=>{
	info = document.querySelectorAll('.item')
	
		swal({	
		timer:2000,
 			 icon: "warning",
 			 text:"List O'chirlyapti....",
 			 closeModal:false,
 			 button: false
		});
		setTimeout(()=>{
			swal({
				timer:2000,
	 			 icon: "success",
	 			 text:"List O'chirildi"
			});
			
			info.forEach( function(element, index) {
				element.remove()
				localStorage.removeItem(`${element.id}`)
			});


			lenI1()
		},1000)

	

})
function lenI1() {
	let lenI = document.querySelector(".lenI")
	lenI.textContent = localStorage.length-1
}
function setPass(){
	let passRIn = document.querySelector(".pass")
	let passRInA = document.querySelector(".passA")
	if(passRIn.value == passRInA.value){
		password={pass:passRIn.value}
		localStorage.setItem("user", JSON.stringify(password) )
		swal({
			timer:2000,
			icon:"success",
			text:"Pin Code O'rnatildi!!!"
		});
		setTimeout(()=>{
			document.querySelector('.loaderBox').style.transform = "translateY(-100%)"
		},1500)
	}else{
		swal({
			timer:2000,
			icon:"warning",
			text:"Ikkala Parol ham bir xil bo`lishi kerak!!!"
		});
	}
}

function logPass(){
	dataLog = JSON.parse(localStorage.getItem("user"))
	let passLIn = document.querySelector(".pass1")
	if(passLIn.value == dataLog.pass){
		swal({
			timer:2000,
			icon:"success",
			text:"Saytga kirlyapti..."
		});
		setTimeout(()=>{
			document.querySelector('.loaderBox').style.transform = "translateY(-100%)"
		},1500)
	}else{
		swal({
			timer:2000,
			icon:"warning",
			text:"Pin Code Xato"
		});
	}
}
function logorreg(){
	passwordBoxR = document.querySelectorAll(".password")
	passwordBoxL = document.querySelector(".password1")
	dataLog = JSON.parse(localStorage.getItem("user"))
	if(dataLog.pass !=""){
		passwordBoxR[0].remove()
	}else{
		passwordBoxL.remove()
	}

	}
logorreg()
lenI1()
ritem3()





