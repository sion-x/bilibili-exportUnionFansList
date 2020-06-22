var json = JSON.parse(document.getElementsByTagName('pre')[0].innerText);
var members = [];

for(var i = 0; i < json.data.totalPage; i++)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4)
		{
            if (xhr.status==200)
            {// 200 = OK
                var json = JSON.parse(xhr.response)
                if((json.code == 0)&(json.msg == 'ok')){
                    for(var j = 0; j < json.data.list.length; j++)
                    {
                        var person = {};
                        person.uid = json.data.list[j].uid;
                        person.name = json.data.list[j].uname;
                        person.fid = json.data.list[j].fans_id;
                        person.wscore = json.data.list[j].weekly_score;
                        person.score = json.data.list[j].score;
                        members.push(person)
                    }
                }
                else{
                    console.log('json parse error')
                    console.log(xhr.response)
                }
            }
            else{
                console.log('Network error')
                console.log(xhr.status)
            }
        }
    }
	xhr.open('get','https://api.live.bilibili.com/activity/v1/UnionFans/getFansList?page=' + (i+1) + '&type=other/',false);
	xhr.send(null);
}

document.getElementsByTagName('pre')[0].innerText = JSON.stringify(members)