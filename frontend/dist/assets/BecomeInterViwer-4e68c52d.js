import{u as h,a as c,j as r,B as p,G as n,T as o,L as E,b as v,e as I,r as w,f as C,g as k,n as F,P as N,h as l,k as T,l as W,S as q,M as D,m as S,o as s,q as Y,H as A,F as B}from"./index-5d41a605.js";import{A as M}from"./apply-now-06e4da99.js";const L="/assets/banner-0a58aaf3.svg",V="/assets/who-are-experts-3ca51df1.svg";function z(){const a=h();c(a.breakpoints.down("sm"));const m=c(a.breakpoints.between("sm","md"));return r.jsxs(p,{children:[r.jsxs(n,{container:!0,marginTop:"11.5rem",children:[r.jsxs(n,{item:!0,sm:12,xs:12,md:6,lg:6,sx:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[r.jsx(o,{variant:"h1",sx:{fontSize:"40px",fontWeight:"600",color:"#080a3c",marginTop:"50px"},children:"Become an Interview Expert"}),r.jsxs(o,{variant:"h6",sx:{marginTop:"1rem",color:"#4a6f8a"},children:["Join our community of experts across technologies, seniority levels, and",r.jsx("br",{})," geography. We are that cool tech nerd group 😛"]}),r.jsx(E,{to:"/demo",children:r.jsx(v,{sx:{backgroundColor:"#1b1b1b",color:"white",marginTop:"2rem",height:"3rem",width:"10rem","&:hover":{backgroundColor:"#080a3c",color:"white"}},children:"Book a Demo"})})]}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,sx:{display:"flex",justifyContent:"center",alignItems:m?"center":"flex-start"},children:r.jsx("img",{src:L,style:{maxWidth:"100%",marginTop:"1rem"},alt:""})})]}),r.jsxs(n,{container:!0,bgcolor:"#f9faff",marginTop:"6rem",padding:"97px",children:[r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,sx:{display:"flex",justifyContent:"center",alignItems:m?"center":"flex-start"},children:r.jsx("img",{src:V,style:{maxWidth:"100%"},alt:""})}),r.jsxs(n,{item:!0,sm:12,xs:12,md:6,lg:6,sx:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[r.jsx(o,{variant:"h1",sx:{fontSize:"50px",fontWeight:"600",color:"#080a3c"},children:"Who are Interview Experts?"}),r.jsx(o,{variant:"h6",sx:{marginTop:"1rem",color:"#4a6f8a"},children:"Experts at InterviewVector come from a variety of fields, including engineering, data science, analytics and product management. Many of them work at world's biggest and most successful companies. With our team of experts from around the world, we have one goal in mind : to make tech hiring easier."})]})]})]})}const G="/assets/journey-65a58962.svg";function P(){const a=h(),m=c(a.breakpoints.down("sm")),u=c(a.breakpoints.between("sm","md"));return r.jsx(p,{children:r.jsxs(n,{container:!0,marginTop:m?"1rem":"8rem",children:[r.jsx(n,{item:!0,sm:12,xs:12,md:12,lg:12,sx:{display:"flex",flexDirection:"row",justifyContent:"center"},children:r.jsx(o,{variant:"h1",sx:{fontSize:"40px",fontWeight:"600",color:"#080a3c",marginTop:"50px",textAlign:"center"},children:"Your journey to becoming an expert with Interviewvector"})}),r.jsx(n,{item:!0,xs:12,sm:12,md:12,lg:12,sx:{display:"flex",justifyContent:"center",alignItems:u?"center":"flex-start"},children:r.jsx("img",{src:G,style:{maxWidth:"100%",marginTop:"5rem"},alt:""})})]})})}const R=[{label:"Front-end Development"},{label:"Back-end Development"},{label:"Full Stack Development"},{label:"Mobile App Development"},{label:"Web Development"},{label:"UI/UX Design"},{label:"Database Management"},{label:"Cloud Computing"},{label:"DevOps"},{label:"Artificial Intelligence"},{label:"Machine Learning"}],$=S().shape({fullName:s().required("Full Name is required"),phoneNumber:s().required("Phone Number is required"),email:s().email("Invalid email").required("Email is required"),linkedIn:s().required("LinkedIn is required"),cvFile:Y().required("CV File is required"),currentEmployer:s().required("Current Employer is required"),experience:s().required("Experience is required"),graduationYear:s().required("Graduation Year is required"),domainExpertise:s().required("Domain Expertise is required"),message:s().required("Message is required")}),O=R.filter(a=>a!==void 0);function H(){const a=h(),m=I(),u=c(a.breakpoints.down("sm")),x=w.useRef(null),e=C({initialValues:{fullName:"",phoneNumber:"",email:"",linkedIn:"",cvFile:null,currentEmployer:"",experience:"",graduationYear:"",domainExpertise:"",message:""},validationSchema:$,onSubmit:async t=>{var g,f,j,b;console.log(t.cvFile[0]);const i=new FormData;i.append("fullName",t.fullName),i.append("phoneNumber",t.phoneNumber),i.append("email",t.email),i.append("linkedIn",t.linkedIn),i.append("cvFile",t.cvFile[0]),i.append("currentEmployer",t.currentEmployer),i.append("experience",t.experience),i.append("graduationYear",t.graduationYear),i.append("domainExpertise",t.domainExpertise),i.append("message",t.message);const d=await m(k(i));(f=(g=d==null?void 0:d.payload)==null?void 0:g.data)!=null&&f.message&&(F.success((b=(j=d==null?void 0:d.payload)==null?void 0:j.data)==null?void 0:b.message),e.resetForm(),y())}}),y=()=>{x.current&&(x.current.value="")};return r.jsxs(n,{container:!0,bgcolor:"#f9faff",marginTop:22,children:[r.jsxs(n,{item:!0,xs:12,sm:12,md:6,lg:6,sx:{padding:"25px"},children:[r.jsx(p,{sx:{display:"flex",justifyContent:"center"},children:r.jsx("img",{src:M,style:{maxWidth:"100%"},alt:""})}),r.jsxs(n,{item:!0,sm:12,xs:12,md:12,lg:12,children:[r.jsx(o,{variant:"h4",textAlign:"center",color:"#080a3c",fontWeight:600,children:"Become an Expert Interviewer with us!"}),r.jsx(o,{variant:"h6",textAlign:"center",color:"#080a3c",marginTop:3,children:"Earn a side income while helping in hiring the best talent."}),r.jsx(o,{variant:"h6",textAlign:"center",color:"#080a3c",children:"Become part of India's best engineering community."})]})]}),r.jsx(n,{item:!0,md:6,lg:6,sm:12,xs:12,sx:{padding:"40px",width:"100%"},children:r.jsxs(N,{style:{padding:"25px",background:"#fff",maxWidth:"auto",height:"100%"},children:[r.jsx(n,{item:!0,children:r.jsx(o,{variant:"h3",fontSize:u?"2rem":"3rem",children:"Apply to become an expert!"})}),r.jsx("form",{onSubmit:e.handleSubmit,encType:"multipart/form-data",children:r.jsxs(n,{container:!0,spacing:2,sx:{paddingTop:"45px"},children:[r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Full Name",id:"fullName",name:"fullName",value:e.values.fullName,onChange:e.handleChange,error:!!(e.touched.fullName&&e.errors.fullName),helperText:e.touched.fullName&&e.errors.fullName?e.errors.fullName:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Phone Number",id:"phoneNumber",name:"phoneNumber",value:e.values.phoneNumber,onChange:e.handleChange,error:!!(e.touched.phoneNumber&&e.errors.phoneNumber),helperText:e.touched.phoneNumber&&e.errors.phoneNumber?e.errors.phoneNumber:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Email",id:"email",name:"email",value:e.values.email,onChange:e.handleChange,error:!!(e.touched.email&&e.errors.email),helperText:e.touched.email&&e.errors.email?e.errors.email:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"LinkedIn",id:"linkedIn",name:"linkedIn",value:e.values.linkedIn,onChange:e.handleChange,error:!!(e.touched.linkedIn&&e.errors.linkedIn),helperText:e.touched.linkedIn&&e.errors.linkedIn?e.errors.linkedIn:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,type:"file",id:"cvFile",name:"cvFile",inputRef:x,onChange:t=>{e.setFieldValue("cvFile",t.currentTarget.files)},error:!!(e.touched.cvFile&&e.errors.cvFile),helperText:e.touched.cvFile&&e.errors.cvFile?e.errors.cvFile:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Current Employer",id:"currentEmployer",name:"currentEmployer",value:e.values.currentEmployer,onChange:e.handleChange,error:!!(e.touched.currentEmployer&&e.errors.currentEmployer),helperText:e.touched.currentEmployer&&e.errors.currentEmployer?e.errors.currentEmployer:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Experience",id:"experience",name:"experience",value:e.values.experience,onChange:e.handleChange,error:!!(e.touched.experience&&e.errors.experience),helperText:e.touched.experience&&e.errors.experience?e.errors.experience:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:6,lg:6,children:r.jsx(l,{fullWidth:!0,label:"Graduation Year",id:"graduationYear",name:"graduationYear",value:e.values.graduationYear,onChange:e.handleChange,error:!!(e.touched.graduationYear&&e.errors.graduationYear),helperText:e.touched.graduationYear&&e.errors.graduationYear?e.errors.graduationYear:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:12,lg:12,children:r.jsxs(T,{fullWidth:!0,children:[r.jsx(W,{id:"domainExpertise-label",children:"Domain Expertise"}),r.jsx(q,{labelId:"domainExpertise-label",id:"domainExpertise",name:"domainExpertise",value:e.values.domainExpertise,onChange:e.handleChange,error:!!(e.touched.domainExpertise&&e.errors.domainExpertise),children:O.map((t,i)=>r.jsx(D,{value:t.label,children:t.label},i))})]})}),r.jsx(n,{item:!0,xs:12,sm:12,md:12,lg:12,children:r.jsx(l,{fullWidth:!0,multiline:!0,rows:4,label:"Message",id:"message",name:"message",value:e.values.message,onChange:e.handleChange,error:!!(e.touched.message&&e.errors.message),helperText:e.touched.message&&e.errors.message?e.errors.message:""})}),r.jsx(n,{item:!0,xs:12,sm:12,md:12,lg:12,children:r.jsx(v,{variant:"contained",color:"primary",fullWidth:!0,type:"submit",children:"Apply Now"})})]})})]})})]})}function Q(){return r.jsxs(r.Fragment,{children:[r.jsx(A,{}),r.jsx(z,{}),r.jsx(P,{}),r.jsx(H,{}),r.jsx(B,{})]})}export{Q as default};