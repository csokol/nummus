(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){},19:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),s=n.n(o),i=(n(13),n(2)),u=n(3),c=n(5),l=n(4),m=n(6),d=(n(25),n(18)),h=n(17),p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".";Object(i.a)(this,e),this.decimalSeparator=t,this.inputDigits=""}return Object(u.a)(e,[{key:"formatted",value:function(){var e=this.formattedCents(),t=e.substring(e.length-2,e.length),n=e.substring(0,e.length-2);return"".concat(n).concat(this.decimalSeparator).concat(t)}},{key:"formattedCents",value:function(){var e=4-this.inputDigits.length;return e>0?Object(h.a)(Array(e).keys()).reduce(function(e){return"0"+e},"")+this.inputDigits:this.inputDigits}},{key:"valueCents",value:function(){return parseInt(this.formattedCents(),10)}},{key:"keyDown",value:function(e){this.inputDigits=this.inputDigits+e}},{key:"backspace",value:function(){this.inputDigits=this.inputDigits.substring(0,this.inputDigits.length-1)}},{key:"clear",value:function(){this.inputDigits=""}}],[{key:"fromCents",value:function(t){for(var n=new e(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"."),a=t.toString(),r=0;r<a.length;r++)n.keyDown(a.charAt(r));return 0===t&&n.clear(),n}}]),e}(),g=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).amountFormatter=p.fromCents(n.props.initialValue),n._amount=null,n.state={value:n.props.initialValue,formattedValue:n.amountFormatter.formatted()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"amountChanged",value:function(e){var t=e.key;e.preventDefault();var n=t.charCodeAt(0);if("Tab"!==t){e.preventDefault();var a="Backspace"===t,r=n>="0".charCodeAt(0)&&n<="9".charCodeAt(0);a?this.amountFormatter.backspace():r&&(this.amountFormatter.keyDown(String.fromCharCode(n)),this.props.onDigit(t)),this.props.onAmountChanged(this.amountFormatter.valueCents()),this.setState({value:this.amountFormatter.valueCents(),formattedValue:this.amountFormatter.formatted()})}}},{key:"render",value:function(){var e=this;return r.a.createElement("input",{type:"number",className:this.props.inputClass,name:"amount",onChange:function(){},onKeyDown:this.amountChanged.bind(this),ref:function(t){e._amount=t},value:this.state.formattedValue})}}]),t}(a.Component);g.defaultProps={onDigit:function(){return console.warn("Unhadled onDigit")},onAmountChanged:function(){},className:"input-group-field amount-input",initialValue:0};var f=g,y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={},n._validationMessages={},n.amountFormatter=new p,n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"amountChanged",value:function(e){var t=e.key,n=t.charCodeAt(0);if("Tab"!==t){e.preventDefault();var a="Backspace"===t,r=n>="0".charCodeAt(0)&&n<="9".charCodeAt(0);a?this.amountFormatter.backspace():r&&(this.amountFormatter.keyDown(String.fromCharCode(n)),this._validationMessages.amount.empty.className="form-error"),this._amount.value=this.amountFormatter.formatted(),this.setState({amount:this.amountFormatter.valueCents()})}}},{key:"clearErrors",value:function(){this._validationMessages.amount.empty.className="form-error"}},{key:"categorySelected",value:function(e){var t=e.target.value,n=this.props.categories.filter(function(e){return e.id===parseInt(t,10)})[0];this._validationMessages.category.empty.className="form-error",this.setState({category:n})}},{key:"formSubmitted",value:function(){var e=this,t=this.props.onSubmit;return function(n){var a=e.state,r=a.category,o=e._amount.state.value,s=[];if(r||(s.push({where:"category",type:"empty_field"}),e._validationMessages.category.empty.className="form-error is-visible"),o||(s.push({where:"amount",type:"empty_field"}),e._validationMessages.amount.empty.className="form-error is-visible"),0!==s.length)return n.preventDefault(),void e.props.onValidationError(s);e.setState({amount:null,category:null}),e.amountFormatter.clear(),e._amount.value=e.amountFormatter.formatted(),e._category.value=null,t(n,Object(d.a)({},a,{amount:o}))}}},{key:"render",value:function(){var e=this,t=this.props.categories.map(function(e,t){return r.a.createElement("option",{key:t,value:e.id},e.name)});return r.a.createElement("form",{className:"expense-form"},r.a.createElement("label",null,r.a.createElement("div",null,"Amount",r.a.createElement("div",{className:"input-group"},r.a.createElement("span",{className:"input-group-label"},"\u20ac"),r.a.createElement(f,{ref:function(t){return e._amount=t},onDigit:this.clearErrors.bind(this),inputClass:"input-group-field amount-input"})),r.a.createElement("div",{className:"form-error-container"},r.a.createElement("span",{ref:function(t){return e._validationMessages.amount={empty:t}},className:"form-error"},"Amount cannot be empty")))),r.a.createElement("label",null,r.a.createElement("div",null,"Category",r.a.createElement("select",{defaultValue:0,className:"expense-form-category",name:"category",onChange:this.categorySelected.bind(this),ref:function(t){return e._category=t}},r.a.createElement("option",{value:0}),t),r.a.createElement("div",{className:"form-error-container"},r.a.createElement("span",{ref:function(t){return e._validationMessages.category={empty:t}},className:"form-error"},"Category cannot be empty")))),r.a.createElement("label",null,r.a.createElement("div",null,"Comment",r.a.createElement("input",{ref:function(t){return e._comment=t},type:"text",className:"expense-form-category",name:"category",onChange:function(t){return e.setState({comment:t.target.value})}}))),r.a.createElement("input",{type:"submit",className:"expense-form-submit success button expanded large",value:"Add expense",onSubmit:this.formSubmitted().bind(this),onClick:this.formSubmitted().bind(this),ref:function(t){return e._submit=t}}))}}]),t}(a.Component);y.defaultProps={onSubmit:function(e,t){return console.warn("Unhadled onSubmit")},onValidationError:function(){return console.warn("Unhadled validation error")},categories:[]};var v=y,b=n(10),E=n.n(b),k=1.1.toLocaleString().substring(1,2),C=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return E()()};Object(i.a)(this,e);var a=t.id,r=t.amountCents,o=t.categoryId,s=t.comment;this.id=a,this.amountCents=r,this.categoryId=o,this.comment=s;var u=n();this.date={day:u.date(),month:u.month()+1,year:u.year(),hour:u.hour(),minute:u.minute()}}return Object(u.a)(e,[{key:"amountAsString",value:function(){var e=this.amountCents%10,t=this.amountCents/10;return"".concat(t).concat(k).concat(e)}},{key:"formattedDate",value:function(){return this.date?this.getDateMoment().format("DD-MM-YYYY HH:mm"):"-"}},{key:"getDateMoment",value:function(){var e="".concat(this.date.day,"-").concat(this.date.month,"-").concat(this.date.year," ").concat(this.date.hour,":").concat(this.date.minute);return E()(e,"DD-MM-YYYY HH:mm")}}],[{key:"createFromState",value:function(t,n){var a=n.category.id;return new e({id:t,amountCents:n.amount,categoryId:a,comment:n.comment})}},{key:"fromJsonObj",value:function(t){var n=new e({id:t.id,amountCents:t.amountCents,categoryId:t.categoryId,comment:t.comment});return n.date=t.date,n.date&&(n.date.hour=t.date.hour||12,n.date.minute=t.date.minute||0),n}}]),e}(),O=n(15),x=n.n(O),j=function(){function e(){Object(i.a)(this,e)}return Object(u.a)(e,[{key:"next",value:function(){return x()()}}]),e}(),w=function(){function e(t){Object(i.a)(this,e),this.localStorage=t}return Object(u.a)(e,[{key:"list",value:function(){return this._getExpenseKeys().map(this.localStorage.getItem.bind(this.localStorage)).map(JSON.parse).map(C.fromJsonObj).sort(function(e,t){return-e.getDateMoment().diff(t.getDateMoment(),"minutes")})}},{key:"_getExpenseKeys",value:function(){var e=this.localStorage.getItem("nummus.io.expenseKeys")||"[]";return JSON.parse(e)}},{key:"add",value:function(e){var t="".concat("nummus.io",".expenses.").concat(e.id),n=this._getExpenseKeys();this.localStorage.setItem(t,JSON.stringify(e)),n.push(t),this.localStorage.setItem("nummus.io.expenseKeys",JSON.stringify(n))}},{key:"delete",value:function(e){var t="".concat("nummus.io",".expenses.").concat(e.id),n=this._getExpenseKeys();this.localStorage.removeItem(t),n=n.filter(function(e){return e!==t}),this.localStorage.setItem("nummus.io.expenseKeys",JSON.stringify(n))}},{key:"amountsByCategory",value:function(){return this.list().reduce(function(e,t){var n=e.get(t.categoryId)||0;return e.set(t.categoryId,n+t.amountCents),e},new Map)}},{key:"dump",value:function(){return JSON.stringify(this.list())}},{key:"loadDump",value:function(e){this.list().forEach(this.delete.bind(this)),JSON.parse(e).map(C.fromJsonObj).forEach(this.add.bind(this))}},{key:"findBy",value:function(e){var t=e.toMoment();return this.list().filter(function(e){var n=e.getDateMoment();return n.month()===t.month()&&n.year()===t.year()})}},{key:"userUuid",value:function(){var e="nummus.io.userUuid",t=this.localStorage.getItem(e)||(new j).next();return this.localStorage.setItem(e,t),t}},{key:"setUserUuid",value:function(e){this.localStorage.setItem("nummus.io.userUuid",e)}},{key:"apiKey",value:function(){return this.localStorage.getItem("nummus.io.apiKey")}},{key:"saveApiKey",value:function(e){this.localStorage.setItem("nummus.io.apiKey",e)}}]),e}(),S=function e(t,n,a){Object(i.a)(this,e),this.id=t,this.categoryBudgets=n,this.month=a},M=1.1.toLocaleString().substring(1,2),_=function(){function e(t,n,a){Object(i.a)(this,e),this.id=t,this.budgeted=n,this.categoryId=a}return Object(u.a)(e,[{key:"setBudget",value:function(e){this.budgeted=e}},{key:"formatedBudgetedAmount",value:function(){var e=this.budgeted%100,t=Math.floor(this.budgeted/100);return"".concat(t).concat(M).concat(e)}}],[{key:"fromCategory",value:function(t){return function(n){return new e("".concat(n.id,"_").concat(t),0,n.id)}}}]),e}(),N=function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:D;Object(i.a)(this,e),this._localStorage=t,this._categoryRepository=n,this._dateProvider=a,this._initializeBudgets()}return Object(u.a)(e,[{key:"list",value:function(){return this.categories}},{key:"_now",value:function(){return this._dateProvider()}},{key:"currentMonthlyBudget",value:function(){var e=this._now().format("YYYY_MM");return this._findOrCreate(e)}},{key:"findMonth",value:function(e){return this.listMonths().filter(function(t){return t.yearMonth===e})[0]}},{key:"_findOrCreate",value:function(e){var t="".concat("nummus.io",".monthlyBudgets.").concat(e),n=this._localStorage.getItem(t);if(n){var a=this._parseObject(n);return a.categoryBudgets=a.categoryBudgets.map(function(e){return Object.assign(new _,e)}),a}var r=this._categoryRepository.list().map(_.fromCategory(e)),o=new S(t,r,e);return this._localStorage.setItem(t,JSON.stringify(o)),o}},{key:"_parseObject",value:function(e){return Object.assign(new S,JSON.parse(e))}},{key:"update",value:function(e){var t="".concat("nummus.io",".monthlyBudgets.").concat(e.month);this._localStorage.setItem(t,JSON.stringify(e))}},{key:"listMonths",value:function(){var t=this;return Object.keys(this._localStorage).filter(function(e){return e.startsWith("nummus.io.monthlyBudgets")}).map(function(e){return t._parseObject(t._localStorage.getItem(e))}).map(function(n){return new e.YearMonth(n.month,t._dateProvider)}).sort(function(e,t){return-e.toMoment().diff(t.toMoment(),"minutes")}).reverse()}},{key:"currentMonth",value:function(){return this.listMonths().filter(function(e){return e.is_current})[0]}},{key:"_initializeBudgets",value:function(){this._findOrCreate(this._now().add(1,"month").format("YYYY_MM")),this._findOrCreate(this._now().format("YYYY_MM")),this._findOrCreate(this._now().subtract(1,"month").format("YYYY_MM"))}}]),e}();function D(){return E()()}N.YearMonth=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:D;Object(i.a)(this,e),this.is_current=n().format("YYYY_MM")===t,this.yearMonth=t}return Object(u.a)(e,[{key:"formatted",value:function(){return this.toMoment().format("MMM YY")}},{key:"toMoment",value:function(){return E()(this.yearMonth,"YYYY_MM")}}]),e}();var I=N,B=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={expenses:n.props.expenses,showCsv:!1},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"makeItem",value:function(e,t){var n=this.props.categoriesById.get(e.categoryId),a=p.fromCents(e.amountCents).formatted();return r.a.createElement("tr",{className:"expense-row",key:t},r.a.createElement("td",null,e.formattedDate()),r.a.createElement("td",null,"\u20ac",a),r.a.createElement("td",null,n.name),r.a.createElement("td",null,r.a.createElement("input",{type:"button",value:"Delete",className:"delete-expense alert button expanded",onClick:this.deleteExpense(e).bind(this)})))}},{key:"render",value:function(){var e=this,t=this.state.expenses.map(this.makeItem.bind(this));return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("tbody",null,t)),r.a.createElement("button",{className:"button expanded large",onClick:function(){return e.setState({showCsv:!e.state.showCsv})}},"As csv"),r.a.createElement("div",{className:this.state.showCsv?"":"hide"},r.a.createElement("pre",null,this.expensesAsCsv())))}},{key:"deleteExpense",value:function(e){var t=this;return function(){t.props.expenseRepository.delete(e),t.setState({expenses:t.props.expenseRepository.findBy(t.props.selectedMonth)})}}},{key:"expensesAsCsv",value:function(){var e=this;return this.props.expenses.map(function(t){var n=p.fromCents(t.amountCents,",").formatted(),a=e.props.categoriesById.get(t.categoryId);return"".concat(t.formattedDate(),"\t").concat(n,"\t").concat(a.name,"\t").concat(a.tags,"\t").concat(t.comment||"")}).reverse().join("\n")+"\n\n"}}]),t}(a.Component),A=function e(t,n,a){Object(i.a)(this,e),this.name=n,this.id=t,this.tags=a},R=function(){function e(){Object(i.a)(this,e);var t=[{name:"fun",tags:["non-essential"]},{name:"groceries",tags:["essential"]},{name:"travel",tags:["non-essential"]},{name:"dining out",tags:["non-essential"]},{name:"rent",tags:["essential"]},{name:"home expense",tags:["essential"]},{name:"sports",tags:["non-essential"]},{name:"transportation",tags:["essential"]},{name:"lunch @ work",tags:["essential"]},{name:"children",tags:["essential"]}].map(function(e,t){return new A(t,e.name,e.tags)});this.categories=t.sort(function(e,t){return e.name.localeCompare(t.name)})}return Object(u.a)(e,[{key:"list",value:function(){return this.categories}},{key:"categoriesById",value:function(){return this.list().reduce(function(e,t){return e.set(t.id,t)},new Map)}}]),e}(),Y=function(){function e(){Object(i.a)(this,e),this.id=0}return Object(u.a)(e,[{key:"next",value:function(){return this.id++,this.id}}]),e}(),U=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categories=n.props.categoryRepository.list(),n.categoriesById=n.props.categoryRepository.categoriesById(),n.expenseRepository=n.props.expenseRepository||new w(localStorage),n.state={expenses:n.expenseRepository.findBy(n.props.selectedMonth)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"grid-x grid-padding-x"},r.a.createElement("div",{className:"large-6 medium-6 cell"},r.a.createElement(v,{categories:this.categories,onSubmit:this.expenseAdded.bind(this)})),r.a.createElement("div",{className:"large-6 medium-6 cell"},r.a.createElement(B,{categoriesById:this.categoriesById,expenses:this.state.expenses,expenseRepository:this.expenseRepository,selectedMonth:this.props.selectedMonth,ref:function(t){return e._expenseHistory=t}})))}},{key:"expenseAdded",value:function(e,t){e.preventDefault();var n=this.props.idGenerator.next(),a=C.createFromState(n,t);this.expenseRepository.add(a),this._expenseHistory.setState({expenses:this.expenseRepository.findBy(this.props.selectedMonth)}),this.setState({expenses:this.expenseRepository.findBy(this.props.selectedMonth)})}}]),t}(a.Component);U.defaultProps={idGenerator:new Y};var K=U,F=function(e){return e},J=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"updateBudget",value:function(e){this.props.categoryBudget.setBudget(e),this.props.budgetUpdated()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"input-group budget-input-group"},r.a.createElement("span",{className:"input-group-label"},"\u20ac"),r.a.createElement(f,{ref:function(t){return e._amountInput=t},initialValue:this.props.categoryBudget.budgeted,onDigit:F,onAmountChanged:this.updateBudget.bind(this),inputClass:"input-group-field budget-input"}))}}]),t}(a.Component);J.defaultProps={budgetUpdated:function(){}};var V=J,P=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categoriesById=n.props.categoryRepository.categoriesById(),n._budgetInputs=[],n._budget=n.props.budgetRepository.currentMonthlyBudget(),n.remainingAmounts=n._budget.categoryBudgets.reduce(function(e,t){var a=n.props.amountSpentByCategory.get(t.categoryId)||0,r=t.budgeted-a;return e.set(t.categoryId,p.fromCents(r).formatted()),e},new Map),n.state={remainingAmounts:n.remainingAmounts},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"budgetUpdated",value:function(e){var t=this;return function(){var n=t.props.amountSpentByCategory.get(e.categoryId)||0,a=e.budgeted-n;t.state.remainingAmounts.set(e.categoryId,p.fromCents(a).formatted()),t.setState({remainingAmounts:t.state.remainingAmounts}),t.props.budgetRepository.update(t._budget)}}},{key:"remainingAmount",value:function(e){var t=this.props.amountSpentByCategory.get(e.categoryId)||0,n=e.budgeted-t;return p.fromCents(n).formatted()}},{key:"render",value:function(){var e=this,t=this._budget.categoryBudgets.map(function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,e.categoriesById.get(t.categoryId).name),r.a.createElement("td",null,r.a.createElement(V,{ref:function(t){return e._budgetInputs.push(t)},categoryBudget:t,budgetUpdated:e.budgetUpdated(t).bind(e)})),r.a.createElement("td",null,"\u20ac",e.getAmount(t)))});return r.a.createElement("div",null,r.a.createElement("h1",null,"Budget dash"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",{className:"category-budget"},r.a.createElement("th",null,"Category"),r.a.createElement("th",null,"Budgeted"),r.a.createElement("th",null,"Available"))),r.a.createElement("tbody",null,t)))}},{key:"getAmount",value:function(e){return this.state.remainingAmounts.get(e.categoryId)}}]),t}(a.Component),H=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"monthChanged",value:function(e){this.props.onMonthChanged(this.props.budgetRepository.findMonth(e.target.value))}},{key:"render",value:function(){var e=this.props.budgetRepository.listMonths(),t=this.props.budgetRepository.currentMonth(),n=e.map(function(e){return r.a.createElement("option",{value:e.yearMonth,key:e.yearMonth},e.formatted())});return r.a.createElement("div",null,r.a.createElement("select",{defaultValue:t.yearMonth,onChange:this.monthChanged.bind(this)},n))}}]),t}(a.Component),L="https://mgdd4jfbph.execute-api.us-east-1.amazonaws.com/prod",T=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={},n.state.dump=n.props.expenseRepository.dump(),n.state.uploadCompleted="",n.state.apiKey=n.props.expenseRepository.apiKey(),n.state.userUuid=n.props.expenseRepository.userUuid(),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadDump",value:function(){this.props.expenseRepository.loadDump(this.state.dump)}},{key:"textAreaChanged",value:function(e){this.setState({dump:e.target.value})}},{key:"apiKeyChanged",value:function(e){this.setState({apiKey:e.target.value}),this.props.expenseRepository.saveApiKey(e.target.value)}},{key:"uuidChanged",value:function(e){this.setState({userUuid:e.target.value}),this.props.expenseRepository.setUserUuid(e.target.value)}},{key:"uploadExpenses",value:function(){var e=this;fetch("".concat(L,"/sync/").concat(this.userUuid),{method:"POST",mode:"cors",headers:{"x-api-key":this.state.apiKey},body:this.state.dump}).then(function(e){return e.json()}).then(function(t){return e.setState({uploadCompleted:"Upload completed: "+JSON.stringify(t)})})}},{key:"downloadExpenses",value:function(){var e=this;fetch("".concat(L,"/sync/").concat(this.userUuid),{method:"GET",mode:"cors",headers:{"x-api-key":this.state.apiKey}}).then(function(e){return e.json()}).then(function(t){e.setState({dump:JSON.stringify(t),downloadCompleted:"Download completed"})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Admin"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"apiKey"},"Api key"),r.a.createElement("input",{value:this.state.apiKey,className:"form-control",type:"text",id:"apiKey",placeholder:"Enter api key",onChange:this.apiKeyChanged.bind(this)}),r.a.createElement("label",{htmlFor:"userUuid"},"User uuid"),r.a.createElement("input",{value:this.state.userUuid,className:"form-control",type:"text",id:"userUuid",placeholder:"Enter user UUID",onChange:this.uuidChanged.bind(this)})),r.a.createElement("label",null),r.a.createElement("hr",null),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"expensesData"},"Expenses dump"),r.a.createElement("textarea",{id:"expensesData",value:this.state.dump,className:"form-control",onChange:this.textAreaChanged.bind(this)})),r.a.createElement("button",{className:"expense-form-submit button",onClick:this.loadDump.bind(this)},"Load dump"),r.a.createElement("hr",null),r.a.createElement("button",{className:"expense-form-submit button",onClick:this.uploadExpenses.bind(this)},"Upload expenses"),r.a.createElement("div",{className:this.state.uploadCompleted?"":"hide"},r.a.createElement("div",{className:"callout success"},r.a.createElement("p",null,this.state.uploadCompleted))),r.a.createElement("hr",null),r.a.createElement("button",{className:"expense-form-submit button",onClick:this.downloadExpenses.bind(this)},"Download expenses"),r.a.createElement("div",{className:this.state.downloadCompleted?"":"hide"},r.a.createElement("div",{className:"callout success"},r.a.createElement("p",null,this.state.downloadCompleted))))}},{key:"getAmount",value:function(e){return this.state.remainingAmounts.get(e.categoryId)}}]),t}(a.Component),W=n(35),G=n(34),z=n(36),Q=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).categoryRepository=new R,n.budgetRepository=new I(localStorage,n.categoryRepository),n.expenseRepository=new w(localStorage),n.state={selectedMonth:n.budgetRepository.currentMonth()},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"makeExpensesDash",value:function(){return r.a.createElement(K,{idGenerator:new j,categoryRepository:this.categoryRepository,selectedMonth:this.state.selectedMonth})}},{key:"makeBudgetDash",value:function(){return r.a.createElement(P,{categoryRepository:this.categoryRepository,budgetRepository:this.budgetRepository,amountSpentByCategory:this.expenseRepository.amountsByCategory()})}},{key:"makeAdminDash",value:function(){return r.a.createElement(T,{expenseRepository:this.expenseRepository})}},{key:"monthChanged",value:function(e){this.setState({selectedMonth:e})}},{key:"render",value:function(){return r.a.createElement(W.a,null,r.a.createElement("div",null,r.a.createElement("div",{className:"top-bar",id:"responsive-menu"},r.a.createElement("div",{className:"top-bar-left"},r.a.createElement("ul",{className:"dropdown menu","data-dropdown-menu":!0},r.a.createElement("li",{className:"menu-text"},r.a.createElement(G.a,{to:"/nummus/"},"Nummus")),r.a.createElement("li",null,r.a.createElement(G.a,{to:"/nummus/budget/"},"Budget")),r.a.createElement("li",null,r.a.createElement(G.a,{to:"/nummus/"},"Expense")),r.a.createElement("li",null,r.a.createElement(H,{budgetRepository:this.budgetRepository,onMonthChanged:this.monthChanged.bind(this)}))))),r.a.createElement("div",{className:"grid-container main-container"},r.a.createElement(z.a,{exact:!0,path:"/nummus/",component:this.makeExpensesDash.bind(this)}),r.a.createElement(z.a,{path:"/nummus/budget/",component:this.makeBudgetDash.bind(this)}),r.a.createElement(z.a,{path:"/nummus/admin/",component:this.makeAdminDash.bind(this)}))))}}]),t}(a.Component),$=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function q(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(r.a.createElement(Q,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(window.addEventListener("beforeinstallprompt",function(e){console.log(e.platforms),e.userChoice.then(function(e){console.log(e)},function(){})}),new URL("/nummus",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/nummus","/service-worker.js");$?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):q(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):q(e)})}}()}},[[19,1,2]]]);
//# sourceMappingURL=main.8868630f.chunk.js.map