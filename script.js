function show() {
	var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
	var hour = time[1] % 12 || 12;               // The prettyprinted hour.
	var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
	new Notification(hour + time[2] + ' ' + period, {
		icon: 'empty_16.png',
		// icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
		body: 'Time to make the toast.'
	});
}


// if (window.Notification) {
// 	show();
// }




function launch_toast() {
	var x = document.getElementById("toast")
	x.className = "show";
	setTimeout(function()
	{
		x.className = x.className.replace("show", "");
	}, 5000);
}



/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

var sidebarOpen = false;




async function toggleSidebar() {

	if(sidebarOpen) {
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}

	else {

		let permission = await Notification.requestPermission();

		// let greeting = new Notification('Hi, How are you?',{
		// 	body: 'Have a good day',
		// 	icon: 'empty_16'
		// });
		// greeting.close();
		//
		//
		// var toast = document.createElement('toast')

		var sidebar = document.createElement('div');

		sidebar.id = "mySidebar";




		sidebar.innerHTML= "\
		\<h1 style='margin: 50px auto; text-align: center'>Hi DigitalBrain</h1>\
		\<br />\
		\<br />\
		\<br />\
		\
		 \
		 \
	 \<button onclick='alert(`Permission is ${Notification.permission}`)'\
	 \ style='background: slategray; margin: 0 auto; border-radius: 7px; cursor: pointer '>\
       \ Permissions!</button>\
		\<br />\
		\<br />\
			\
			\ <button onclick='setTimeout(() => new Notification(`Stripe Refunded`,{\
			\	body: `Thank god`,\
			\	icon: `http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png`\
			\ })\
             \ .close(), 500);'\
		\
		\ style='background: blueviolet; border-radius: 7px; cursor: pointer '>\
		\
		\ Refund Stripe Transaction</button>\
		\
		\<br />\
		\ <button onclick='setTimeout(() => new Notification(`Shipping Address Changed`,{\
					\	body: `And we know where you live`,\
					\	icon: `http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png`\
					\ })\
					 \ .close(), 1000);'\
		\
				\ style='background: dimgray; border-radius: 7px; cursor: pointer '>\
		\
		\ Change Shipping Address</button>\
		 \
		 \<br />\
			\ <button onclick='setTimeout(() => new Notification(`Shopify Refunded`,{\
			\	body: `But you still owe some money mate`,\
			\	icon: `http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png`\
			\ })\
             \ .close(), 500);'\
		\
		\ style='background: dimgray; border-radius: 7px; cursor: pointer '>\
		\
		\ Refund Shopify</button>\
		\
		\
		\
		\
		";


		sidebar.style.cssText = "\
			position:fixed;\
			top:0px;\
			right:0px;\
			width:30%;\
			height:100%;\
			background:grey;\
			z-index:999999;\
			\
		";

		document.body.appendChild(sidebar);
		sidebarOpen = true;
	}
}
// 			box-shadow:inset 0 0 1em black;