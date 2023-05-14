//gm count
var posts = []
var gms = ['gm', 'Gm', 'GM', 'gM']
var res = posts.filter(data => data.includes(gms[0]) || data
.includes(gms[1]) || data.includes(gms[2]) || data.includes(gms[3]));

console.log(res.length)
