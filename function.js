loadData=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res=>res.json())
        .then(data=> {
            displayData(data.data)
        })
}

displayData=(data)=>{
    for(let issue of data){
        const infoDiv = document.createElement("div");
        infoDiv.innerHTML = `
        <div class="card w-80 shadow-lg bg-white border-t-4 border-success mx-auto justify-evenly">
                    <div class="w-5/6 mx-auto pt-4">
                        <div class="flex justify-between pb-4 items-center">
                            <div>
                                <img src="./assets/Open-Status.png" alt="">
                            </div>
                            <p class="text-error bg-[#FEECEC] rounded-full w-20 text-center text-xs py-1">HIGH</p>
                        </div>
                        <h2 class="pb-2 text-sm font-semibold">Fix navigation menu on mobile devices</h2>
                        <p class="text-[#64748B] text-xs">The navigation menu doesn't collapse properly on mobile devices...</p>
                        <div class="flex text-xs gap-1 py-3 pb-4">
                            <p class="text-error bg-[#FEECEC] rounded-full text-center p-1">BB Bug</p>
                            <p class="text-[#D97706] bg-[#FDE68A] rounded-full text-center p-1">Help wanted</p>
                        </div>
                        <hr class="border-t border-gray-300">
                        <p class="text-[#64748B] text-xs pt-4 pb-2">#1
                                by john_doe</p>
                            <p class="text-[#64748B] text-xs pb-4">
                                1/15/2024
                            </p>
                    </div>
                </div>
        `;
        const allSect = document.getElementById("allSect");
        allSect.append(infoDiv);
    }
}
loadData();