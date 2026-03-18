let title = document.getElementById( 'title');
let price = document.getElementById( 'price');
let taxes = document.getElementById( 'taxes');
let ads = document.getElementById( 'ads');
let discount = document.getElementById( 'discount');
let total = document.getElementById( 'total');
let count = document.getElementById( 'count');
let category = document.getElementById( 'category');
let submit = document.getElementById('submit' );
let mood ='create';


// get total
function getTotal()
{
    if(price.value !='')
    {
        let resualt =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=resualt;
        total.style.background='#00b4d8'

    }
    else{
        total.style.background='#0a9396'
        total.innerHTML='';
    }

}
//create product
let datapro;
if(localStorage.getItem('data') != null)
{
    datapro = JSON.parse(localStorage.data)
}
else{
    datapro =[];
}
submit.onclick=function()
{
    let newpro=
    {
        title: title.value.toLowerCase(), 
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount:discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '')
    {
        if(mood==='create')
    {
        if(newpro.count>1)
    {
        for(let i=0; i < newpro.count;i++)
        {
            datapro.push(newpro);
        }
    }
    else
    {
    datapro.push(newpro);
    }

    }
    else{
        datapro[temp]=newpro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';

    }
    

    }
    
    localStorage.setItem('data',JSON.stringify(datapro));
    cleardata();
    showdata();

}
// clear inputs
function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
    
}

// read
function showdata()
{
    let table ='';
    for(let i=0; i< datapro.length;i++)
    {
        // getTotal();

        table+=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delate">delete</button></td>
        
        </tr>
        `

    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteAll');
    if(datapro.length>0)
    {
        btndelete.innerHTML=
        `
        <button onclick="deleteAll()">delete All (${datapro.length})</button>
        `
    }
    else{
        btndelete.innerHTML=
        `
        
        `
    }
}
showdata();
// delete
function deletedata(i)
{
datapro.splice(i,1);
// localStorage.product=JSON.stringify(datapro);
localStorage.setItem('data',JSON.stringify(datapro));
showdata();

}
// deleteAll
function deleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    showdata();


}
// updateData
function updateData(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    taxes.value=datapro[i].taxes;
    category.value=datapro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='update';
    mood='update';
    temp=i;





}
// search
let searchmood = 'title';


function getsearchmood(id) 
{
    let search =document.getElementById('search');

    if(id === 'searchtitle') {  
        searchmood = 'title';
        // search.placeholder='Search By Title';
        
    } 
    else 
    {
        searchmood = 'category';
        // search.placeholder='Search By Category';
    }
    search.focus();
    search.value='';
    showdata();
        search.placeholder='Search By '+searchmood;

}

function searchdata(value)
{
    let table='';
    if(searchmood=='title')
    {
        for(let i=0;i<datapro.length;i++)
        {
            if(datapro[i].title.includes(value.toLowerCase()))
            {
                table+=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delate">delete</button></td>
        
        </tr>
        `


            }
        }



    }
    else{
        for(let i=0;i<datapro.length;i++)
        {
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase()))
            {
                table+=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delate">delete</button></td>
        
        </tr>
        `


            }
        }
        
        


    }
    
    document.getElementById('tbody').innerHTML=table;
    

}

// MOBILE ONLY BUTTON EFFECT
if (window.matchMedia("(pointer: coarse)").matches) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            let btn = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
            btn.style.transform = "scale(0.95)";
            btn.style.transition = "0.1s";
        }
    });

    document.addEventListener('touchend', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            let btn = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
            btn.style.transform = "scale(1)";
        }
    });
}
