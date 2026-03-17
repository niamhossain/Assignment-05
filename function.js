//Fetching Data

    let allData;
    let openData;
    let closedData;

    let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";    
    loadData=(option)=>{
        fetch(url)
            .then(res=>res.json())
            .then(data=> {
                allData = data.data;
                openData = allData.filter(issue => issue.status==="open")
                closedData = allData.filter(issue => issue.status==="closed")
                if(option==="all"){
                    displayData(allData);
                }
                else if(option==="open"){
                    displayData(openData);
                }
                else{
                    displayData(closedData);
                }
            })
    }

    // Dispaying All data
    displayData=(data)=>{
        allSect.innerHTML = "";
        for(let issue of data){
            const infoDiv = document.createElement("div");
            let priorityColor;
            let borderColor;
            let img;
            if(issue.priority==="high"){
                priorityColor = `bg-[#FEECEC] text-error`;
            }
            else if(issue.priority==="medium"){
                priorityColor = `bg-[#FFF6D1] text-warning`;
            }
            else{
                priorityColor = `bg-[#EEEFF2] text-[#9CA3AF]`;
            }
            if(issue.status=="open"){
            borderColor = `border-success open`;
            img = `<img src="./assets/Open-Status.png" alt="">`
            }
            else{
                borderColor = `border-[#A855F7] closed`
                img = `<img src="./assets/Closed- Status .png" alt="">`
                }
            infoDiv.innerHTML = `
            <div class="card w-5/6 sm:w-64 shadow-lg bg-white border-t-4 ${borderColor} mx-auto justify-evenly">
                        <div class="w-5/6 mx-auto pt-4">
                            <div class="flex justify-between pb-4 items-center">
                                <div>
                                    ${img}
                                </div>
                                <p class="rounded-full w-20 text-center text-xs py-1 ${priorityColor}">${issue.priority.toUpperCase()}</p>
                            </div>
                            <h2 class="pb-2 text-sm font-semibold">${issue.title}</h2>
                            <p class="text-[#64748B] text-xs">${issue.description}</p>
                            <div class="flex text-xs gap-1 py-3 pb-4">
                                <p class="text-error bg-[#FEECEC] rounded-full text-center py-1 border px-2">${issue.labels[0]}</p>
                                ${issue.labels[1]? `<p class="text-[#D97706] bg-[#FFF8DB] rounded-full text-center py-1 border px-2">${issue.labels[1]}</p>` : ""}
                                
                            </div>
                            <hr class="border-t border-gray-300">
                            <p class="text-[#64748B] text-xs pt-4 pb-2">#${issue.id}
                                    by ${issue.author}</p>
                                <p class="text-[#64748B] text-xs pb-4">
                                    ${dateConversion(issue.createdAt)}
                                </p>
                        </div>
                    </div>
            `;
            const allSect = document.getElementById("allSect");
            allSect.append(infoDiv);
        }
    }

loadData("all");





//login part
const signIn = document.getElementById("btnLogin");
signIn.addEventListener("click", function(){
    const user = document.getElementById("userName");
    const pass = document.getElementById("passWord");
    if(user.value!="admin" || pass.value!="admin123"){
        alert("Credentils don't match");
        user.value = ""
        pass.value = ""
    }
    else{
        document.getElementById("loginSect").classList.add("hidden");
        const allSection = document.querySelectorAll(".primarySects");
        allSection.forEach(sect => sect.classList.remove("hidden"))
    }
})


// Date Conversion
dateConversion = (dateInfo) =>{
    const date = new Date(dateInfo);
    const day = date.getUTCDate();
    const month = date.getUTCMonth()+1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}


document.getElementById("allBtn").addEventListener("click", () =>{
    loadData("all");
    removeBtnPrimary();
    document.getElementById("allBtn").classList.add("btn-primary");
})
document.getElementById("openBtn").addEventListener("click", () =>{
    loadData("open");
    removeBtnPrimary();
    document.getElementById("openBtn").classList.add("btn-primary");
})
document.getElementById("closedBtn").addEventListener("click", () =>{
    loadData("closed");
    removeBtnPrimary();
    document.getElementById("closedBtn").classList.add("btn-primary");
})

removeBtnPrimary=()=>{
    document.querySelectorAll(".btnSect").forEach(btn => btn.classList.remove("btn-primary"))
}