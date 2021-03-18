function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  }); 

}

async function years() {
  await sleep(1000);
  return [
    {id:"2000", desc:"year 2000"},
    {id:"2020", desc:"year 2020"},
  ]
}

async function courses(id_year) {
  await sleep(1000);
  return [
    {id:"2000-01", desc: "2000 course one", id_year:"2000"},
    {id:"2000-02", desc: "2000 course two", id_year:"2000"},
    {id:"2020-01", desc: "2020 course one", id_year:"2020"},
    {id:"2020-02", desc: "2020 course two", id_year:"2020"},

  ].filter(el=>el.id_year===id_year)
}

async function students(id_course) {
  await sleep(1000);
  return [
    {id:"st1", desc: "st one", id_course:"2000-01"},
    {id:"st2", desc: "st two", id_course:"2000-02"},
    {id:"st3", desc: "st three", id_course:"2020-01"},
    {id:"st4", desc: "st four", id_course:"2020-02"},
    {id:"st5", desc: "st five", id_course:"2000-01"},
    {id:"st5", desc: "st five", id_course:"2000-02"},
    {id:"st5", desc: "st five", id_course:"2020-01"},
    {id:"st5", desc: "st five", id_course:"2020-02"},
  ].filter(el=>el.id_course===id_course)
}

export default {
  years, courses, students
}

