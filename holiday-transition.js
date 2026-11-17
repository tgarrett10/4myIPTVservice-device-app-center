(function(){
 'use strict';
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const page=location.pathname.split('/').pop()||'index.html';
 if(day>'2026-12-15'&&['index.html','sell-sheet.html','request-service.html','checkout.html'].includes(page))location.replace('regular-'+page+location.search+location.hash);
})();
