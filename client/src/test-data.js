const __users = [{"employee_id":"468-147-3372","name":"Roman Thwaites","email":"rthwaites0@issuu.com","role_id":3,"department_id":1,"contact_number":"7087768120","address":"48458 Shoshone Parkway","status":true,"work_position_id":2,"id":1},
    {"employee_id":"152-800-9099","name":"Mordecai Leppingwell","email":"mleppingwell1@delicious.com","role_id":3,"department_id":3,"contact_number":"3615023700","address":"83 Comanche Lane","status":true,"work_position_id":3,"id":2},
    {"employee_id":"840-492-3742","name":"Dion Liddyard","email":"dliddyard2@cpanel.net","role_id":3,"department_id":1,"contact_number":"7653513919","address":"57 Namekagon Court","status":true,"work_position_id":1,"id":3},
    {"employee_id":"237-625-6799","name":"Nara McGinley","email":"nmcginley3@jigsy.com","role_id":3,"department_id":3,"contact_number":"8328522713","address":"1246 Barnett Street","status":true,"work_position_id":1,"id":4},
    {"employee_id":"614-442-3984","name":"Umberto Marlor","email":"umarlor4@wordpress.org","role_id":3,"department_id":2,"contact_number":"9568313133","address":"3 Buhler Park","status":true,"work_position_id":2,"id":5},
    {"employee_id":"360-283-7731","name":"Alastair Rochelle","email":"arochelle5@home.pl","role_id":3,"department_id":1,"contact_number":"6917645180","address":"6859 Bartillon Place","status":true,"work_position_id":4,"id":6},
    {"employee_id":"378-470-1765","name":"Slade Heavyside","email":"sheavyside6@spiegel.de","role_id":3,"department_id":2,"contact_number":"7753351103","address":"94818 Algoma Crossing","status":true,"work_position_id":4,"id":7},
    {"employee_id":"818-735-4311","name":"Klement Rahill","email":"krahill7@live.com","role_id":3,"department_id":3,"contact_number":"3463676279","address":"13265 Butternut Junction","status":true,"work_position_id":1,"id":8},
    {"employee_id":"834-696-1286","name":"Kally Gery","email":"kgery8@miitbeian.gov.cn","role_id":3,"department_id":3,"contact_number":"2405484079","address":"7 Debra Lane","status":true,"work_position_id":1,"id":9},
    {"employee_id":"225-486-7331","name":"Kissiah Jeavon","email":"kjeavon9@e-recht24.de","role_id":3,"department_id":1,"contact_number":"9862727817","address":"037 Hayes Crossing","status":true,"work_position_id":4,"id":10},
    {"employee_id":"626-715-0915","name":"Cullen Lancetter","email":"clancettera@mac.com","role_id":3,"department_id":3,"contact_number":"4182631422","address":"009 Victoria Point","status":true,"work_position_id":4,"id":11},
    {"employee_id":"297-628-3174","name":"Gerianne Cleaton","email":"gcleatonb@techcrunch.com","role_id":3,"department_id":3,"contact_number":"3346826484","address":"94 Lawn Terrace","status":true,"work_position_id":3,"id":12},
    {"employee_id":"446-479-4416","name":"Chanda Zoanetti","email":"czoanettic@wix.com","role_id":3,"department_id":1,"contact_number":"6403225598","address":"26549 Burning Wood Way","status":true,"work_position_id":3,"id":13},
    {"employee_id":"904-427-3360","name":"Darrel Wauchope","email":"dwauchoped@cam.ac.uk","role_id":3,"department_id":3,"contact_number":"5249782929","address":"6133 Transport Way","status":true,"work_position_id":3,"id":14},
    {"employee_id":"205-921-5446","name":"Bertha Tilling","email":"btillinge@bluehost.com","role_id":3,"department_id":1,"contact_number":"6554071813","address":"041 Old Gate Way","status":true,"work_position_id":1,"id":15},
    {"employee_id":"705-250-7646","name":"Amelita Prandini","email":"aprandinif@imdb.com","role_id":3,"department_id":2,"contact_number":"1062842758","address":"35 Darwin Drive","status":true,"work_position_id":2,"id":16},
    {"employee_id":"469-105-0898","name":"Joli Barron","email":"jbarrong@myspace.com","role_id":3,"department_id":2,"contact_number":"4823517188","address":"8 Knutson Way","status":true,"work_position_id":3,"id":17},
    {"employee_id":"398-122-5603","name":"Kelcie Fairy","email":"kfairyh@webs.com","role_id":3,"department_id":3,"contact_number":"1583744523","address":"61 Dryden Crossing","status":true,"work_position_id":2,"id":18},
    {"employee_id":"198-198-9116","name":"Georgie O'Lunny","email":"golunnyi@biblegateway.com","role_id":3,"department_id":3,"contact_number":"3705967625","address":"46966 Bay Place","status":true,"work_position_id":3,"id":19},
    {"employee_id":"229-891-4283","name":"Catina Simondson","email":"csimondsonj@mozilla.com","role_id":3,"department_id":2,"contact_number":"5546619186","address":"7 Sachtjen Crossing","status":true,"work_position_id":2,"id":20}]

const roles = [
    {id : 1, title: "admin-role"},
    {id : 2, title: "manager-role"},
    {id : 3, title: "employee-role"},
]

const work_positions = [
    {id: 1, title: "Web Developer"},
    {id: 2, title: "Mobile Developer"},
    {id: 3, title: "Hybrid Developer"},
    {id: 4, title: "Desktop Developer"},
]

const departments = [
    {id: 1, title: "Native Department",leader_user_id: 1},
    {id: 2, title: "Web Department",leader_user_id: 2},
    {id: 3, title: "Rapid Department",leader_user_id: 3},
]

export {
    __users,
    roles,
    work_positions,
    departments
}