export function homeDate(data:object){
        let datas=data.message
        let project_count=datas.project.length
        let task_obj=datas.task
        let task_count=0 
        let task_doing=0
        let task_done=0
        let project_name=''
        let all_task_obj=datas.all_task
        let all_task_count=0
        let task_list=[]
        let all_task_doing=0
        let all_task_done=0
        for (let i=0;i<project_count;i++){
            project_name=datas.project[i].name
            task_count+=task_obj[i][project_name].length
            all_task_count+=all_task_obj[i][project_name].length
            for (let j=0;j<task_obj[i][project_name].length;j++){
                task_list.push(task_obj[i][project_name][j])
                if (task_obj[i][project_name][j]['status']=='doing'){
                    task_doing++
                }
                else{
                    task_done++
                }
            }
            for (let z=0;z<all_task_obj[i][project_name].length;z++){
                console.log()
                if (all_task_obj[i][project_name][z]['status']=='doing'){
                    all_task_doing++
                }
                else{
                    all_task_done++
                }
            }
        }
        
        return [project_count,all_task_count,task_doing,task_done,task_list,all_task_doing,all_task_done]
    }

export function projectData(data:object){
    let list=[]
    let project_task_count=0
    let project_member_count=0
    let time=''

    for (let i=0;i<data.project.length;i++){
        const seen=new Set()
        let project_name=data.project[i].name
        let description=data.project[i].description
        time=data.project[i].created_at
        project_task_count=data.task.filter(item => item.project_name === project_name).length
        project_member_count=data.member.filter(item =>item.project_name === project_name).filter(items =>{
            if (seen.has(items.username)) return false
            seen.add(items.username)
            return true
        }).length   
        let task_doing_count=(data.task.filter(item =>item.project_name === project_name).filter(item => item.status === 'doing')).length

        list.push(
            {name:project_name,description:description,progress:Math.floor(task_doing_count / project_task_count *100),task_count:project_task_count,member:project_member_count,time:time}
        )
    }
    return list
}
