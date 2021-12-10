class Task{
    constructor(id, title, desc, timeBegin, timeEnd, status){
        this.__id = id;
        this.__title = title;
        this.__desc = desc;
        this.__timeBegin = timeBegin;
        this.__timeEnd = timeEnd;
        this.__status = status;
    }
    
    set id(value) { this.__id = value };
    get id() { return this.__id };
    
    set title(value) { this.__title = value };
    get title() { return this.__title };
    
    set desc(value) { this.__desc = value };
    get desc() { return this.__desc };
    
    set timeBegin(value) { this.__timeBegin = value };
    get timeBegin() { return this.__timeBegin };
    
    set timeEnd(value) { this.__timeEnd = value };
    get timeEnd() { return this.__timeEnd };
    
    set status(value) { this.__status = value };
    get status() { return this.__status };
}

taskList = Array();

function create(){
    btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', addTask);
    
    btnUpdate = document.getElementById('btnUpdate');

    editDom  = document.getElementById('edit');

    text_search  = document.getElementById('text_search');

    result_search  = document.getElementById('result_search');

    btn_search  = document.getElementById('btn_search');
    btn_search.addEventListener('click', search);

    close_search  = document.getElementById('close_search');
    close_search.addEventListener('click', function() {
        result_search.style.display = 'none';
        text_search.value = '';
        close_search.style.display = 'none';
    });
    
    text_sort  = document.getElementById('sort');

    btn_sort  = document.getElementById('btn_sort');
    btn_sort.addEventListener('click', function() { sort(text_sort.value); })

    btnClearn = document.getElementById('btnClearn');
    btnClearn.addEventListener('click', function() {
        taskList = [];
        render();
    })
    
    //ADD 
    rootDom = document.getElementById('root');
    titleDom = document.getElementById('title');
    descDom = document.getElementById('desc');
    timebeginDom = document.getElementById('timebegin');
    timeendDom = document.getElementById('timeend');
    statusDom = document.getElementById('status');

    // EDIT
    editTitleDom = document.getElementById('edit_title');
    editDescDom = document.getElementById('edit_desc');
    editTimebeginDom = document.getElementById('edit_timebegin');
    editTimeendDom = document.getElementById('edit_timeend');
    editStatusDom = document.getElementById('edit_status');

    // SEARCH
    result_id = document.getElementById('result_id'); 
    result_title = document.getElementById('result_title'); 
    result_desc = document.getElementById('result_desc'); 
    result_timebegin = document.getElementById('result_timebegin'); 
    result_timeend = document.getElementById('result_timeend'); 
    result_status = document.getElementById('result_status'); 

}

function render(){
    rootDom.innerHTML = '';
    if(taskList != null){
        taskList.forEach(task => {
            rootDom.appendChild(createNodeTask(task));
        })
    }
}

function createNodeTask(task){
    
    bgColor = '';
    bgColor = (task.status == 'not_start') ? 'color-gray': (task.status == 'doing') ? 'color-yellow' : 'color-green';

    nodeRow = document.createElement('div');
    nodeRow.setAttribute('class', 'row m-2 shadow ' + bgColor);

    nodeId = document.createElement('div');
    nodeId.setAttribute('class','col-md-1');
    nodeId.innerHTML = task.id;
    nodeRow.appendChild(nodeId);

    nodeTitle = document.createElement('div');
    nodeTitle.setAttribute('class','col-md-2');
    nodeTitle.innerHTML = task.title;
    nodeRow.appendChild(nodeTitle);
    
    nodeDesc = document.createElement('div');
    nodeDesc.setAttribute('class','col-md-2');
    nodeDesc.innerHTML = task.desc;
    nodeRow.appendChild(nodeDesc);
    
    nodeTimeBegin = document.createElement('div');
    nodeTimeBegin.setAttribute('class','col-md-2');
    nodeTimeBegin.innerHTML = task.timeBegin;
    nodeRow.appendChild(nodeTimeBegin);
    
    nodeTimeEnd = document.createElement('div');
    nodeTimeEnd.setAttribute('class','col-md-2');
    nodeTimeEnd.innerHTML = task.timeEnd;
    nodeRow.appendChild(nodeTimeEnd);
    
    nodeStatus = document.createElement('div');
    nodeStatus.setAttribute('class','col-sm-1');
    nodeStatus.innerHTML = task.status;
    nodeRow.appendChild(nodeStatus);

    // CREATE DIV BUTTON
    nodeBtnWrap = document.createElement('div');
    nodeBtnWrap.setAttribute('class', 'col-md-1 d-flex');
    nodeRow.appendChild(nodeBtnWrap);

    nodeButtonEdit = document.createElement('button');
    nodeButtonEdit.setAttribute('class','btn btn-warning');
    nodeButtonEdit.innerHTML = 'Edit';
    nodeBtnWrap.appendChild(nodeButtonEdit);
    nodeButtonEdit.addEventListener('click', function (){
        editTask(task.id);
    });

    nodeBtnDelete = document.createElement('Btn');
    nodeBtnDelete.setAttribute('class','btn btn-danger mx-2');
    nodeBtnDelete.innerHTML = 'Delete';
    nodeBtnWrap.appendChild(nodeBtnDelete);
    nodeBtnDelete.addEventListener('click', function (){
        deleteTask(task.id);
    });

    nodeBtnUpdate = document.createElement('button');
    nodeBtnUpdate.setAttribute('class','btn btn-success mx-2 update');
    nodeBtnUpdate.innerHTML = 'Update';
    nodeBtnWrap.appendChild(nodeBtnUpdate);
    nodeBtnUpdate.addEventListener('click', function (){
        updateTask(task.id);
    });

    return nodeRow;
}

let id = 0;
function addTask(){
    task = new Task(++id, titleDom.value, descDom.value, timebeginDom.value, timeendDom.value, statusDom.value);
    taskList.push(task);
    render();
}

function editTask(id){
    taskList.forEach(task => {
        if(task.id == id){
            editDom.style.display = 'block';
            editTitleDom.value = task.title;
            editDescDom.value = task.desc;
            editTimebeginDom.value = task.timeBegin;
            editTimeendDom.value = task.timeEnd;
            editStatusDom.value = task.status;
        }
    })
}

function updateTask(id){
    taskList.forEach(task => {
        if(task.id == id){
            task.title = editTitleDom.value;
            task.desc = editDescDom.value;
            task.timeBegin = editTimebeginDom.value;
            task.timeEnd = editTimeendDom.value;
            task.status = editStatusDom.value;
            editDom.style.display = 'none';
        }
    })
    render();
}

function deleteTask(id){
    i = 0;
    for(; i < taskList.length; i++){
        if(taskList[i].id == id) taskList.splice(i , 1);
    }
    render();
}

function search(){
    taskList.forEach(task => {
        if(task.title == text_search.value){
            result_search.style.display = 'block';
            close_search.style.display = 'block';
            result_id.innerHTML = task.id;
            result_title.innerHTML = task.title;
            result_desc.innerHTML = task.desc;
            result_timebegin.innerHTML = task.timeBegin;
            result_timeend.innerHTML = task.timeEnd;
            result_status.innerHTML = task.status;
            bgColor = '';
            bgColor = (task.result_status == 'not_start') ? 'color-gray': (task.result_status == 'doing') ? 'color-yellow' : 'color-green';
            result_search.setAttribute('class', 'm-auto py-2');
        }
    })
}

function sort(value){
    switch(value){
        case 'sort_title': 
            taskList.sort(function(a,b){
                return a.title.localeCompare(b.title);
            })
            break;
        case 'sort_time_begin':
            taskList.sort(function(a,b){
                return a.timeBegin.localeCompare(b.timeBegin);
            })
            break;
        case 'sort_time_end':
            taskList.sort(function(a,b){
                return a.timeEnd.localeCompare(b.timeEnd);
            })
            break;
    }
    render();
}

window.onload = function(e) {
    create();
    render();
};