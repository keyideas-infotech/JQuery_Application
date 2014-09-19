var instance, html = '';
var forSelection = '';
var forMailBoxCount = '';
$(function(){
  $(window).bind( 'hashchange', function(e) {
    // Get the hash (fragment) as a string, with any leading # removed. Note that
    // in jQuery 1.4, you should use e.fragment instead of $.param.fragment().
	//sajax_cancel();
	//sajax_init_object();
    var url = $.param.fragment(); //alert(base64_decode(url));
	var forCompose = base64_encode('compose');
	var forAdvanceSearch = base64_encode('advanceSearch');
	var forNormalSearch = base64_encode('normalSearch');
	var getStrpos = strpos(window.location.href, 'calendar', 5);
	if(getStrpos){
		urlArray = explode('&',url);
		url = urlArray[0];
		oldTime = urlArray[1];
		//alert(oldTime);
		currentTime = $('#serverTime').val();
		//alert(currentTime);
		
		if(url == 'add'){
			if(oldTime !=currentTime){
				window.location.hash = '';
				window.location.href = str_replace('#','',window.location.href);
			}
			var dayFind = $('.fc-sun').text();
			$('#calendar').show();
			$('#calendarEdit').show();
			$('#calendar').hide();
			$('#calendar').css({height:0, padding:0, overflow:'hidden'}); 
			$('.conExportdrowpDownCont').removeAttr('style');
			$('.conExportdrowpDownCont').css({marginLeft:'-100px'});
		}
		if(url == 'edit'){
		//alert('ok');
			if(oldTime !=currentTime){
				window.location.hash = '';
				window.location.href = str_replace('#','',window.location.href);
			}
			if($('#mode').val() == 'add'){
				$('#title1').next('span').remove();
				var getValue = $(".putValue").val();			
				$(".assignValue").val(getValue);		
				//strTime = getCorrectStrToTime($("#fromDate").val());
				var newDate = new Date();
				var curr_date = newDate.getDate();
				var curr_month = newDate.getMonth() + 1; //months are zero based
				if(curr_month<10){
					curr_month = '0'+curr_month;
				}
				if(curr_date<10){
					curr_date = '0'+curr_date;
				}
				var curr_year = newDate.getFullYear();
				var finalDate = curr_month+'/'+curr_date+'/'+curr_year;
				$("#fromDate").val(finalDate);
				var newDate = new Date();
				var curr_date = newDate.getDate();
				var curr_month = newDate.getMonth() + 1; //months are zero based
				if(curr_month<10){
					curr_month = '0'+curr_month;
				}
				if(curr_date<10){
					curr_date = '0'+curr_date;
				}
				var curr_year = newDate.getFullYear();
				var finalDate = curr_month+'/'+curr_date+'/'+curr_year;
				$("#toDate").val(finalDate);
				$('#calendar').hide();
				$('#calendarEdit').show();
				$(this).parents('.calendarToopTipCont').css('display', 'none');
				
				if($('.hideInvitation').attr('checked', true)){
					$('#createInvitation:visible').css('display', 'none');
				}
				
			}else{
				if($('#mode').val() == 'edit'){									
					
					$("#successMsg").remove();
					
					var eventID = $('#currentEventID').val();
					var calendarAccountID = $('.calendarAccountID').val();
					var calendarDomainID = $('.calendarDomainID').val();					
					var mode = 'fetchDetail';
					//alert(eventID); alert(calendarAccountID); alert(calendarDomainID); alert(mode); alert(EVENTAJAXURL); return false;
					
					$.ajax({
						type: "POST",
						url: EVENTAJAXURL,		
						data: { mode: mode , eventID: eventID, calendarAccountID: calendarAccountID, calendarDomainID: calendarDomainID },
						success: function (data){
							//alert(data);
								
							$('#calendar').hide();
							$('#calendarEdit').html(data);
							$('#calendarEdit').show();
							$(this).parents('.calendarToopTipCont').css('display', 'none');
							
							addAllJS();
							validateDetailForm();
						}
					});
					return false;
					
					
					/*$('#calendar').hide();
					$('#calendarEdit').show();
					$(this).parents('.calendarToopTipCont').css('display', 'none');
					
					
					
					strTime = getCorrectStrToTime($("#fromDate").val());
					var newDate = new Date(strTime);
					var curr_date = newDate.getDate();
					var curr_month = newDate.getMonth() + 1; //months are zero based
					if(curr_month<10){
						curr_month = '0'+curr_month;
					}
					if(curr_date<10){
						curr_date = '0'+curr_date;
					}
					var curr_year = newDate.getFullYear();
					var finalDate = curr_month+'/'+curr_date+'/'+curr_year;
					$("#fromDate").val(finalDate);
					strTime = getCorrectStrToTime($("#toDate").val());
					var newDate = new Date(strTime);
					var curr_date = newDate.getDate();
					var curr_month = newDate.getMonth() + 1; //months are zero based
					if(curr_month<10){
						curr_month = '0'+curr_month;
					}
					if(curr_date<10){
						curr_date = '0'+curr_date;
					}
					var curr_year = newDate.getFullYear();
					var finalDate = curr_month+'/'+curr_date+'/'+curr_year;
					$("#toDate").val(finalDate);
					
					eventID = $('#currentEventID').val();
					accountID = $('.calendarAccountID').val();
					domainID = $('.calendarDomainID').val();
					if(eventID && accountID && domainID){
						var mode = 'fetchDetail';
						//alert(domainID); alert(eventID); alert(mode); alert(EVENTAJAXURL); 
						if(domainID == '1'){
							$.ajax({
								type: "POST",
								url: EVENTAJAXURL,		
								data: { mode: mode , eventID: eventID , accountID: accountID , domainID: domainID },
								success: function (data){
									//alert(data);
										
									$('#calendar').hide();
									$('#calendarEdit').html(data);
									$('#calendarEdit').show();
									
									addAllJS();
									
									//alert($('.eventTimeDrop ul li:first-child').text());
								}
							});
							return false;
						}
					}
					$('#calendar').hide();
					$('#calendarEdit').show();
					$(this).parents('.calendarToopTipCont').css('display', 'none');
				*/						
				}
			}
		}
		return true;
	
	}
	if((url == '' || url == null || url == 'undefined') && $('#defaultMailList').val() ){
			var getStrpos = strpos(window.location.href, 'dashboard', 5);
			if(getStrpos){
				url = $('#defaultMailList').val();			
				window.location.hash= url;
				return true;
			}else{
				return true;	
			}
			
		}	
	   var urlSplit = url.split("/");
	   forMailBoxCount = base64_decode(urlSplit[0])
	    makeFolderSelected(forMailBoxCount); // This is used to make the folder selected after refreshing.
		if(urlSplit.length>1){
			chkUrl = urlSplit[1];
			if(chkUrl == forCompose){
				 sajax_cancel();
				 sajax_init_object();
				x_phpComposeMail(chkUrl,ajaxReturnCMail);
			}else if(chkUrl == forAdvanceSearch){
				if(urlSplit.length == 3){
					$('#containerformaillist').addClass('ajax_loader_image');
					sajax_cancel();
					sajax_init_object();
					refreshMailList(url);
				}else if(urlSplit.length > 3){
					chkUrl = urlSplit[3];
					sajax_cancel();
					sajax_init_object();
					x_printMessage(chkUrl,ajaxReturnGetMsg);
				}
			}else if(chkUrl == forNormalSearch){
				
				if(urlSplit.length == 3){
					$('#containerformaillist').addClass('ajax_loader_image');
					sajax_cancel();
					sajax_init_object();
					refreshMailList(url);
				}else if(urlSplit.length > 3){
					chkUrl = urlSplit[3];
					sajax_cancel();
					sajax_init_object();
					x_printMessage(chkUrl,ajaxReturnGetMsg);
				}
			}else{		
				$('#containerformaillist').addClass('ajax_loader_image');
				sajax_cancel();
				sajax_init_object();
				x_printMessage(chkUrl,ajaxReturnGetMsg);
			}
		}else{
				if(url!=''){
					url = getUrlWithCorrectNumberOfPage(url);
					$('#advancedSearchDiv').slideUp('slow');
					resetSearchAndFilter($('#advancedSearchForm'));
					//$('html, body').animate({scrollTop:0}, 500);
					//window.scrollTo(0, 0);
					var refresh = true;
					var decodUrl = base64_decode(url);
					var fdArray = new Array();
					fdArray = explode('|',decodUrl);
					fArray = explode('_',fdArray[0]);
					if(fArray[0] != 'b'){
						refresh = false;
					}
					if(fdArray[1]){
						var dArray = new Array();
						dArray = explode('_',fdArray[1]);
						if(dArray[0] != 'd'){
							refresh = false;
						}
					}
					if(fdArray[2]){
						var nmArray = new Array();
						nmArray = explode('_',fdArray[2]);
						if(nmArray[0] != 'nm'){
							refresh = false;
						}
					}
					if(fdArray[3]){
						var pageArray = new Array();
						pageArray = explode('_',fdArray[3]);
						if(pageArray[0] != 'p'){
							refresh = false;
						}
					}
					if(!refresh){
						url = $('#defaultMailList').val();			
						window.location.hash= url;
					}
					$('#containerformaillist').addClass('ajax_loader_image');
					sajax_cancel();
					sajax_init_object();
					//alert(base64_decode(url));
					refreshMailList(url);
					
				}
			}
				
			
		 
  })
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
   $(window).trigger( 'hashchange' );
  
});

// This function is used to get the Url with correct number of page .

function getUrlWithCorrectNumberOfPage(url){
	var withPageUrl = '';
	if(url == ''){
		withPageUrl = $('#defaultMailList').val();
	}else{
		var decodUrl = base64_decode(url);
		var fdArray = new Array();
		fdArray = explode('|',decodUrl);
		fArray = explode('_',fdArray[2]);
		var numberOfMailOnPage = $('#noOfMessageOnPage').val();
		withPageUrl = fdArray[0]+'|'+fdArray[1]+'|'+'nm_'+numberOfMailOnPage+'|'+fdArray[3];
	}
	return base64_encode(withPageUrl);
}
$(document).ready(function() {
	//setTimeout('checkNeedUpdateMailList()', 5000);
	//getUpdatedMailBox();
	//alert(ajaxMessageInterval);
	//synchronizeMailBox();
	//self.setInterval('getUpdatedMailBox()', ajaxMessageInterval);
	//self.setInterval('synchronizeMailBox()', ajaxMessageInterval);
	getMailBox();
	getSeenMessage();
	paginationMailBox();
	//synchronizeMailBox();
	//showPrevMailList();
	//showNextMailList();
		
});
function synchronizeMailBox(){
	var getStrpos = strpos(window.location.href, 'member/dashboard', 5);
	var condition = $('.moveToFolder').attr('lang');
	if(getStrpos && condition == 'mailList'){
		x_synchronizeMailServer('setIntervalFunction',ajaxReturnMailServer);
	}
}
function ajaxReturnMailServer(z){
	return true;
}
function getUpdatedMailBox(){
	var getStrpos = strpos(window.location.href, 'member/dashboard', 5);
	var condition = $('.moveToFolder').attr('lang');
	var noOfMessage = $('#noOfTotalMessageOnPage').val();
	if(getStrpos && condition == 'mailList'){
		var url = $.param.fragment(); 
		url = base64_decode(url);
		var urlArray = new Array();
		urlArray = explode('/',url);
		url = urlArray[0];
		var fdArray = new Array();
		fdArray = explode('|',url);
		url = fdArray[0];
		var bArray = new Array();
		bArray = explode('_',url);
		url = bArray[1];
		//var folderIDArray = new Array();
		//folderIDArray = explode(',',url);
		//for(i=0;i<count(folderIDArray);i++){
			//var mailBoxFolderID = base64_encode(folderIDArray[i]);
			var mailBoxFolderID = base64_encode(url);
			x_getUpdatedMailList(mailBoxFolderID,noOfMessage,ajaxReturnUpdatedMailList);
			//x_getNoUpdatedMails(mailBoxFolderID,ajaxReturnNoOfUpdatedMails);
		//}
	}
	
	  
}
function ajaxReturnNoOfUpdatedMails(z){
	if(z>=1 && z != 0){
	var mailBoxFolderID = base64_encode(z);
		x_getUpdatedMailList(mailBoxFolderID,ajaxReturnUpdatedMailList);
	}
}
function ajaxReturnUpdatedMailList(z){
	if(z != '0'){
		var pageUrl = window.location.hash;
		var forSearch = new Array();
		var fdArray = new Array();
		var nofPageArray = new Array();
		var searchParams = '',prevLink = '',nextLink = '';
		var forSearch = explode('/',pageUrl);
		pageUrl = forSearch[0];
		pageUrl = base64_decode(substr(pageUrl,1,pageUrl.length));
		fdArray = explode('|',pageUrl);
		mailBoxArray = explode('_',fdArray[0]);
		var mailBoxFolderID = mailBoxArray[1];
		sdArray = explode('_',fdArray[1]);
		var socialMediaID = sdArray[1];
		
		
		var message = new Array();
		message = JSON.parse(z);
		var messageHeader = new Array();
		var messageContent = new Array();
		messageHeader = message['messageInfo'];
		messageContent = message['messageContent'];
		var addedNoMsg = parseInt(count(messageContent));
		var preNoMsg = $('#noOfTotalMessageOnPage').val();
		var totalNoMsg = parseInt(preNoMsg)+parseInt(addedNoMsg);
		$('#noOfTotalMessageOnPage').val(totalNoMsg);
		$('.maxLimitMessage').html('of '+totalNoMsg);
		$('#containerformaillist').addClass('ajax_loader_image');
		var mailOnSinglePage = $('#noOfMessageOnPage').val();
		var inc=0;
		for(i=0;i<count(messageContent);i++){
			var div = '';
			if(totalNoMsg > mailOnSinglePage){
				var mailID = $('#forMailDetails ul li:last input[type=checkbox]').attr('id');
				var mailArray = new Array();
				mailArray = explode("_",mailID);
				inc = mailArray[1];
			}else{
				inc = totalNoMsg+1;
			}
			mObj = messageContent[i];
			from = urldecode(mObj['messageFrom']);
			
			mailDomainID = mObj['domainID'];
			domainMessageMailBoxID = mObj['mailBoxFolderID'];
			if(strlen(from)>25){
				from = substr(from,0,25)+'...';
			}
			subject = '';
			if(trim(mObj['subject']) == ''){
				subject ='No Subject';
			}else{
				subject = mObj['subject'];
			}
			if(strlen(subject)>60){
				subject = substr(subject,0,60)+'..............';
			}
			time = mObj['messageTime'];
			var mtime = strtotime(mObj['messageDate']);
			var date = strftime("%b %d",mtime);
			
			attachment = mObj['isAttachement'];
			seen = mObj['seen'];
			cssClass = '';
			if(seen == '0' || seen == 0){
				cssClass = 'unreadmail';
			}else{
				cssClass = 'readmail';
			}
			domainName = 'NajMail';
			accountName = mObj['accountName'];
			accountName = mObj['accountName'];
			if(accountName.length >12 ){
				accountName = substr(accountName,0,10)+'..';
			}
			domainNameCss = 'najmailColor';
			if(mailDomainID == 1){
				domainName = 'NajMail';
				domainNameCss = 'najmailColor';
			}
			if(mailDomainID == 2){
				domainName = 'Gmail';
				domainNameCss = 'gmailColor';
			}
			if(mailDomainID == 3){
				domainName = 'Yahoo';
				domainNameCss = 'yahoomailColor';
			}
			if(mailDomainID == 4){
				domainName = 'Hotmail';
				domainNameCss = 'hotmailColor';
			}
			if(mailDomainID == 5){
				domainName = 'AOL';
				domainNameCss = 'aolmailColor';
			}
			var domainMessageMailBoxIDV = base64_encode('d_'+socialMediaID+'|m_'+mObj['messageID']+'|'+'b_'+mailBoxFolderID+'|'+'cb_'+domainMessageMailBoxID+'|'+'nm_50|p_1|cd_'+mObj['socialMediaID']);
			div += '<li id="'+domainMessageMailBoxIDV+'" class="'+cssClass+'">';
						div +='<div class="column_1  '+domainNameCss+'"><span class="inputCheckBox"><input type="checkbox" id="emailValue_'+inc+'" value="'+domainMessageMailBoxIDV+'" /></span>'+accountName+'</div>';
						div +='<div class="column_2">'+from+'<span></span></div>';
						div +='<div class="column_3">'+subject+'</div>';
							if(attachment == 1){
								div +='<div class="column_4 attchedIcon">';
							}else{
								div +='<div class="column_4">';
							}
							div +=''+date+'</div></li>';
			
			if(totalNoMsg > mailOnSinglePage){
				$('#forMailDetails ul li:last ').remove();
			}
			$('#forMailDetails ul').prepend(div);
		}
		$('#containerformaillist').removeClass('ajax_loader_image');
	}
	getSeenMessage();
	paginationMailBox();
	paginationDropDown();
	showHideSideBar();
	showSideText();
	appendAdvancedSearchText();
}
function createUploader(){
var upurl = JSAttachUrl+'.php'; 
var tmpFolderValue = $('#tmpFolder').val();
	var uploader = new qq.FileUploader({
		element: document.getElementById('file-uploader-attachment'),
		action: upurl,
		params: {
			tempdir: tmpFolderValue,
		},
		debug: true
	});           
}
function showPrevMailList(link){
	mailBoxIDdomainID = link;
	window.location.hash = mailBoxIDdomainID;
	$('#containerformaillist').addClass('ajax_loader_image');
}
function jsComposeMail(compose){
	$('#containerformaillist').addClass('ajax_loader_image');
	var hashVal = window.location.hash; 
	var hashArray = hashVal.split('/');
	if(hashArray.length>1){
		if(hashArray[1] != compose){
			$('#discardHashVal').val(hashVal);
			window.location.hash = '';
			window.location.hash = hashArray[0]+'/'+compose;
		}else{
			$('#discardHashVal').val(hashArray[0]);
			window.location.hash = '';
			window.location.hash = hashArray[0]+'/'+compose;
		}
	}else{
		window.location.hash = hashVal+'/'+compose;
	}	
}
function showNextMailList(link){
		mailBoxIDdomainID = link;
		window.location.hash = mailBoxIDdomainID;
		$('#containerformaillist').addClass('ajax_loader_image');
		//refreshMailList(mailBoxIDdomainID,'next');
	
}
function paginationMailBox(){
	$('.paginationLink').click(function(){
		$('#containerformaillist').addClass('ajax_loader_image');
		var mailInPageArray = new Array();
		mailInPageArray = explode(",",mailInPage);
		//alert(mailInPageArray[0]);
		mailBoxIDdomainID = $(this).attr('id');
		noOfMail = base64_decode($(this).attr('lang'));
		var pageUrl = window.location.hash;
		pageUrl = substr(pageUrl,1,pageUrl.length);
		var div = '';
		//alert(base64_decode(mailBoxIDdomainID));
		fdArray = explode('|',base64_decode(pageUrl));
		newFDArray = fdArray[0]+'|'+fdArray[1]+'|nm_';
		NumberOfMailOnPage = noOfMail;
		nofPageArray = explode('_',fdArray[3]);
		pageNumber = nofPageArray[1];
		mailBoxIDdomainID = base64_encode(fdArray[0]+'|'+fdArray[1]+'|nm_'+NumberOfMailOnPage+'|p_1');
		//alert(NumberOfMailOnPage);
		for(p = 0;p<count(mailInPageArray);p++){
			if(mailInPageArray[p]!=NumberOfMailOnPage){
				//paramWithPagination = base64_encode(newFDArray+mailInPageArray[p]+'|p_'+pageNumber);
				paramWithPagination = base64_encode(mailInPageArray[p]);
				div += '<span class="paginationLink" id="'+paramWithPagination+'" lang="'+paramWithPagination+'">'+mailInPageArray[p]+'</span>';
			}
		}
		//alert(div);
		var selimitText = '1 - '+NumberOfMailOnPage;
		//alert(selimitText);
		var totalNumberOfMessage = $('#noOfTotalMessageOnPage').val();
		$('#noOfMessageOnPage').val(NumberOfMailOnPage);
		if(parseInt(NumberOfMailOnPage) >= parseInt(totalNumberOfMessage)){
			$('.next').html('');
			}else{
			nextLink = base64_encode(newFDArray+NumberOfMailOnPage+'|p_'+(parseInt(pageNumber)+1));
			nextMailList = "showNextMailList('"+nextLink+"')";
			var nextDiv = "<span onclick='"+nextMailList+"' lang='"+nextLink+"'>&nbsp;</span>";
			$('.next').html(nextDiv);
		}
		$('#selimit').html(selimitText);
		$('#mailPaging').html(div);
		$('#bselimit').html(selimitText);
		$('#bmailPaging').html(div);
		window.location.hash = mailBoxIDdomainID;
		//refreshMailList(mailBoxIDdomainID);
	});
}
function getMailBox(){
	$('.inbox').click(function(){
		$('#containerformaillist').addClass('ajax_loader_image');
		mailBoxIDdomainID = $(this).attr('lang');
		//refreshMailList(mailBoxIDdomainID);
		window.location.hash = '';
		window.location.hash = mailBoxIDdomainID;
	});
}
function getSeenMessage(){
	$('.readmail').click(function(event){
		if($(event.target).is('.column_1 span, .column_1 span input')){
		}
		else{
			id = $(this).attr('id');
			var url = $.param.fragment();
			
			//window.location.hash = '';
			window.location.hash = url+'/'+id;
			$('#containerformaillist').addClass('ajax_loader_image');
			//x_printMessage(id,ajaxReturnGetMsg);
		}
	});
	$('.unreadmail').click(function(event){
		if($(event.target).is('.column_1 span, .column_1 span input')){
		}
		else{
			id = $(this).attr('id');
			var url = $.param.fragment();
			window.location.hash = url+'/'+id;
			$('#containerformaillist').addClass('ajax_loader_image');
			$('#containerformaillist').addClass('ajax_loader_image');
			//x_printMessage(id,ajaxReturnGetMsg);
		}
	});
}
function makeFolderSelected(forSelection){// This is used to make the folder selected after refreshing.
	var selectArray = forSelection.split('|');
	forSelection = selectArray[0];
	var selectArray = forSelection.split('_');
	forSelection = selectArray[1];
	//var makeSelectID = base64_encode('cfID_'+forSelection);
	$('.inbox').removeClass('selected');
	$('.inbox').addClass('unSelected');
	$('.inbox').each(function(){
		var langValue = base64_decode($(this).attr('lang'));
		var selectArray = langValue.split('|');
		langValue = selectArray[0];
		var selectArray = langValue.split('_');
		langValue = selectArray[1];
		if(langValue == forSelection){
			$(this).addClass('selected');
			return true;
		}
	});
}
function refreshMailList(mailBoxIDdomainID){
	$('.moveToFolder').attr('lang','mailList');
	$('.dashboardMenuRight ul li').css('display','inline');
	$('.dashboardMenuRight ul li#showPrevMessageContent').css('display','none');
	$('.dashboardMenuRight ul li#showNextMessageContent').css('display','none');
	$('.dashboardMenuLeft ul li.viewMsg').remove();
	$('.dashboardMenuLeft ul li.listMsg').css('display','inline');
	$('.mailNav').css('display','block');
	$('.dashboardMenuLeft ul li.composeMsg').css('display','none');
	x_printMailList(mailBoxIDdomainID,returnWithMailList);
	
}
function returnWithMailList(z){

	$.getScript(JSCONFJSDIR+"jquery.ezmark.js");
	$.getScript(JSCONFJSDIR+"jquery.ezmark.min.js");
	$.getScript(JSCONFJSDIR+"designerScript.js");
	$('#containerformaillist').removeClass('ajax_loader_image');
	var message = new Array();
	message = JSON.parse(z);
	var messageHeader = new Array();
	var messageContent = new Array();
	messageHeader = message['messageInfo'];
	messageContent = message['messageContent'];
	$('#noOfTotalMessageOnPage').val(messageHeader['totalShowMsg']);
	$('.maxLimitMessage').html('of '+messageHeader['totalShowMsg']);
	var NumberOfMailOnPage = $('#noOfMessageOnPage').val();
		
		var pageUrl = window.location.hash;
		var forSearch = new Array();
		var fdArray = new Array();
		var nofPageArray = new Array();
		var searchParams = '',prevLink = '',nextLink = '';
		var forSearch = explode('/',pageUrl);
		pageUrl = forSearch[0];
		pageUrl = base64_decode(substr(pageUrl,1,pageUrl.length));
		fdArray = explode('|',pageUrl);
		mailBoxArray = explode('_',fdArray[0]);
		var mailBoxFolderID = mailBoxArray[1];
		sdArray = explode('_',fdArray[1]);
		var socialMediaID = sdArray[1];
		nofPageArray = explode('_',fdArray[3]);
		pageNumber = nofPageArray[1];
		startLimit = 0;
		endLimit = 0;
		if(parseInt(pageNumber) >1){
			startLimit = ((parseInt(pageNumber)-1) * parseInt(NumberOfMailOnPage));
			endLimit = (parseInt(startLimit) + parseInt(NumberOfMailOnPage));
			}else{
			startLimit = 1;
			endLimit = parseInt(NumberOfMailOnPage);
			
		}
	
		if(count(forSearch)>=2){
			if(base64_decode(forSearch[1]) == 'normalSearch'){
				searchParams = '/'+forSearch[1]+'/'+forSearch[2];
			}else if(base64_decode(forSearch[1]) == 'advanceSearch'){
				searchParams = '/'+forSearch[1]+'/'+forSearch[2];
				}
		}else{
		
		}
			// Here is code for Creation Next Link for pagination.
			if(parseInt(NumberOfMailOnPage) >= parseInt(messageHeader['totalShowMsg']) || parseInt(endLimit) >= parseInt(messageHeader['totalShowMsg'])){
				$('.next').html('');
			}else{
			
				nextLink = base64_encode(fdArray[0]+'|'+fdArray[1]+'|nm_'+NumberOfMailOnPage+'|p_'+(parseInt(pageNumber)+1));
				nextLink = nextLink+searchParams;
				//nextLink = base64_encode(newFDArray+NumberOfMailOnPage+'|p_'+pageNumber);
				nextMailList = "showNextMailList('"+nextLink+"')";
				var nextDiv = "<span onclick="+nextMailList+" lang='"+nextLink+"'>&nbsp;</span>";
				$('.next').html(nextDiv);
			}
			// End of Code of Next Link for Pagination.
			
			// Here is code for Creation Prev Link for pagination.
			if(parseInt(pageNumber) >1){
				//newFDArray = fdArray[0]+'|'+fdArray[1]+'|nm_';
				//prevLink = base64_encode(newFDArray+NumberOfMailOnPage+'|p_'+(parseInt(pageNumber)-1));
				prevLink = base64_encode(fdArray[0]+'|'+fdArray[1]+'|nm_'+NumberOfMailOnPage+'|p_'+(parseInt(pageNumber)-1));
				prevLink = prevLink+searchParams;
				prevMailList = "showPrevMailList('"+prevLink+"')";
				var nextDiv = "<span onclick="+prevMailList+" lang='"+prevLink+"'>&nbsp;</span>";
				$('.prev').html(nextDiv);
			}else{
				$('.prev').html('');
			}
			// End of Code of Prev Link for Pagination.
			
			var str = startLimit+' - '+endLimit;
			$('.showRangeOfPage').html('');
			$('.showRangeOfPage').html(str);
	var div = '<ul>';
	var inc=0;
	if(count(messageContent)>0){
		for(i=0;i<count(messageContent);i++){
			inc = inc+1;
			mObj = messageContent[i];
			from = urldecode(mObj['messageFrom']);
			//alert(from);
			mailDomainID = mObj['domainID'];
			domainMessageMailBoxID = mObj['mailBoxFolderID'];
			if(strlen(from)>25){
				from = substr(from,0,25)+'...';
			}
			subject = '';
			if(trim(mObj['subject']) == ''){
				subject ='No Subject';
			}else{
				subject = mObj['subject'];
			}
			if(strlen(subject)>60){
				subject = substr(subject,0,60)+'..............';
			}
			time = mObj['messageTime'];
			var mtime = strtotime(mObj['messageDate']);
			var date = strftime("%b %d",mtime);
			
			attachment = mObj['isAttachement'];
			seen = mObj['seen'];
			cssClass = '';
			if(seen == '0' || seen == 0){
				cssClass = 'unreadmail';
			}else{
				cssClass = 'readmail';
			}
			domainName = 'NajMail';
			accountName = mObj['accountName'];
			if(accountName.length >12 ){
				accountName = substr(accountName,0,10)+'..';
			}
			domainNameCss = 'najmailColor';
			if(mailDomainID == 1){
				domainName = 'NajMail';
				domainNameCss = 'najmailColor';
			}
			if(mailDomainID == 2){
				domainName = 'Gmail';
				domainNameCss = 'gmailColor';
			}
			if(mailDomainID == 3){
				domainName = 'Yahoo';
				domainNameCss = 'yahoomailColor';
			}
			if(mailDomainID == 4){
				domainName = 'Hotmail';
				domainNameCss = 'hotmailColor';
			}
			if(mailDomainID == 5){
				domainName = 'AOL';
				domainNameCss = 'aolmailColor';
			}
			//var domainMessageMailBoxIDV = 'd_'+socialMediaID+'|m_'+mObj['messageID']+'|'+'b_'+mailBoxFolderID+'|'+'cb_'+domainMessageMailBoxID+'|'+'nm_50|p_1|cd_'+mailDomainID;
			var domainMessageMailBoxIDV = base64_encode('d_'+socialMediaID+'|m_'+mObj['messageID']+'|'+'b_'+mailBoxFolderID+'|'+'cb_'+domainMessageMailBoxID+'|'+'nm_50|p_1|cd_'+mObj['socialMediaID']);
			div += '<li id="'+domainMessageMailBoxIDV+'" class="'+cssClass+'" >';
						div +='<div class="column_1  '+domainNameCss+'"><span class="inputCheckBox"><input type="checkbox" id="emailValue_'+inc+'" value="'+domainMessageMailBoxIDV+'" /></span>'+accountName+'</div>';
						div +='<div class="column_2">'+from+'<span></span></div>';
						div +='<div class="column_3">'+subject+'</div>';
							if(attachment == 1){
								div +='<div class="column_4 attchedIcon">';
							}else{
								div +='<div class="column_4">';
							}
							div +=''+date+'</div></li>';
		
		}
	}else{
		div += '<li><center>No mail in the mailbox</center></li>';
	}
	div +='</ul>';
	
	$('#forMailDetails').html();
	$('#forMailDetails').html(div);
	$('.moveToFolder').attr('lang', 'mailList'); // This Line is using to check that Move To Folder is on MailList section or Mail Details section (Particular Mail Section);
	$('.deleteMails').attr('lang', 'mailList'); // This Line is using to check that Delete Mail is on MailList section or Mail Details section (Particular Mail Section);
	
	$('.markAllAsRead').removeAttr('style'); // This Line is using to check that markAllAsRead is on MailList section or Mail Details section (Particular Mail Section);
	//$('.markAllAsRead').css('display','inline'); // This Line is using to check that markAllAsRead is on MailList section or Mail Details section (Particular Mail Section);
	$('.markAsRead').attr('lang', 'mailList'); // This Line is using to check that markAsRead Mail is on MailList section or Mail Details section (Particular Mail Section);
	
	$('.markAsUnRead').attr('lang','mailList'); // This Line is using to check that markAsUnRead is on MailList section or Mail Details section (Particular Mail Section);
	$('.addStar').attr('lang', 'mailList'); // This Line is using to check that addStar Mail is on MailList section or Mail Details section (Particular Mail Section);
	$('.removeStar').attr('lang', 'mailList'); // This Line is using to check that Delete Mail is on MailList section or Mail Details section (Particular Mail Section);
	
	
	if ($('#forMailDetails ul').height() < $(window).height()){
		$('.dashboardBottomMenu').css('display','none');
	}else{
		$('.dashboardBottomMenu').css('display','block');
	}
	$('.replysecondMenu').remove();
	$('#replyBottomMenu').remove();
	$('#reply').remove();
	$('#forward').remove();
	getSeenMessage();
	paginationMailBox();
	paginationDropDown();
	showHideSideBar();
	showSideText();
	appendAdvancedSearchText();
	
	
	var forNormalSearch = base64_encode('normalSearch');
	var forAdvanceSearch = base64_encode('advanceSearch');
	
	var url = $.param.fragment(); 
	var urlSplit = url.split("/");	
	if(urlSplit.length>1){
		chkUrl = urlSplit[1];
		if(chkUrl == forNormalSearch){				
			if(urlSplit.length >= 3){				
				recallNormalSearch();				
			}
		}else if(chkUrl == forAdvanceSearch){
			if(urlSplit.length == 3){				
				$('#getSearchText').attr('value','');
				recallAdvanceSearch();	
				$("#startDateSearch, #endDateSearch").datepicker();
			}
		}
	}
	equalHeight($('.equalHeight'));
	
	
}
function ajaxReturnGetMsg(z){
$('.moveToFolder').attr('lang','mailContent');
	if(z !=''){
		$('#containerformaillist').removeClass('ajax_loader_image');
		$('.moveToFolder').attr('lang','mailContent'); // This Line is using to check that Move To Folder is on MailList section or Mail Details section (Particular Mail Section);
		$('.deleteMails').attr('lang', 'mailContent'); // This Line is using to check that Delete Mail is on MailList section or Mail Details section (Particular Mail Section);
		
		$('.markAllAsRead').css({height:0, opacity:0 }); // This Line is using to check that markAllAsRead is on MailList section or Mail Details section (Particular Mail Section);
		$('.markAsRead').attr('lang', 'mailContent'); // This Line is using to check that markAsRead Mail is on MailList section or Mail Details section (Particular Mail Section);
		
		$('.markAsUnRead').attr('lang','mailContent'); // This Line is using to check that markAsUnRead is on MailList section or Mail Details section (Particular Mail Section);
		$('.addStar').attr('lang', 'mailContent'); // This Line is using to check that addStar Mail is on MailList section or Mail Details section (Particular Mail Section);
		$('.removeStar').attr('lang', 'mailContent'); // This Line is using to check that Delete Mail is on MailList section or Mail Details section (Particular Mail Section);
		
		$('.dashboardMenuRight ul li').css('display','none');
		$('.dashboardMenuRight ul li.prevContent').css('display','inline');
		$('.dashboardMenuRight ul li.nextContent').css('display','inline');
		$('.mailNav').css('display','none');
		$('.dashboardMenuLeft ul li.viewMsg').remove();
		$('.dashboardMenuLeft ul li.listMsg').css('display','inline');
		$('.dashboardMenuLeft ul li.composeMsg').css('display','none');
		$('#forMailDetails').html('');
		z = evalScript(z);
		$('#forMailDetails').html(z);
		//alert($('#curMessageSeenStatus').val());
		if(parseInt($('#curMessageSeenStatus').val())){
			
		}else{
			
			var selectArray = forMailBoxCount.split('|');
			forMailBoxCount = selectArray[0];
			var selectArray = forMailBoxCount.split('_');
			forMailBoxCount = selectArray[1];
			$('.inbox').each(function(){
				var langValue = base64_decode($(this).attr('lang'));
				var selectArray = langValue.split('|');
				langValue = selectArray[0];
				var selectArray = langValue.split('_');
				langValue = selectArray[1];
				if(langValue == forMailBoxCount){
					var numberOfMailCount = $(this).find('span').html();
					numberOfMailCount = numberOfMailCount.replace('(', '');
					numberOfMailCount = numberOfMailCount.replace(')', '');
					numberOfMailCount = parseInt(numberOfMailCount);
					var div = '';
					if(numberOfMailCount >1){
						div = '('+parseInt(numberOfMailCount-1)+')';
					}
					$(this).find('span').html(div);
				}
			});
			
			
		}
		if($('#forMailDetails').html().length>0){
			var noOfImgTag = $('.viewHi').find('img').size();
			if(noOfImgTag >0 ){
				$('.displayicon').css('display','block');
				$('.viewHi').find('img').css('display','none');
			}
			var mailContent = $('#forBackFolderContent').val();
			var nextMessageID = $('#curNextMessageID').val();
			var prevMessageID = $('#curPrevMessageID').val();
			$('.dashboardMenuRight ul li.prevContent').attr('rel',prevMessageID);
			$('.dashboardMenuRight ul li.nextContent').attr('rel',nextMessageID);
			var x ="backToFolder('"+mailContent+"')";
			var backMsg = '<li class="viewMsg"><a href="javascript:void(0);" onclick="'+x+'" >Back</a></li><li class="viewMsg" id="forreplymail" onclick="addReply(this);"><a href="javascript:void(0);">Reply</a></li>';
				backMsg += '<li class="viewMsg" id="forforwardmail" onclick="addForward(this);"><a href="javascript:void(0);">Forward</a></li>';
			
			
			$('.dashboardMenuLeft ul').prepend(backMsg);
			$('.dashboardBottomMenu').css('display','block');
			$('.replysecondMenu').remove();
			$('#replyBottomMenu').remove();
			$('#reply').remove();
			$('#forward').remove();
			showSideText();
			
			var getIdentifyAdvanceSearch = identifyAdvanceSearch();	
			if(getIdentifyAdvanceSearch == 'advanceSearch'){					
				recallAdvanceSearch();
			}else if(getIdentifyAdvanceSearch == 'normalSearch'){
				recallNormalSearch();
			}
		}
	}
}
function displayAllImage(){
	var noOfImgTag = $('.viewHi').find('img').size();
	if(noOfImgTag >0 ){
		$('.viewHi').find('img').css('display','inline');
		$('.displayicon').css('display','none');
	}
}
function backToFolder(mailBoxFolderID){
	$('#addNewAccountForDomain').addClass('ajax_loader_image');
	var url = $.param.fragment();
	urlSplit = url.split('/');
	if(urlSplit.length>3){
		url = urlSplit[0]+'/'+urlSplit[1]+'/'+urlSplit[2];
	}else{
		url = urlSplit[0];
	}
	window.location.hash = url;	
	
	
	/*var getIdentifyAdvanceSearch = identifyAdvanceSearch();
	if(getIdentifyAdvanceSearch == 'advanceSearch'){					
		recallAdvanceSearch();
	}else if(getIdentifyAdvanceSearch == 'normalSearch'){
		recallNormalSearch();
	}*/
				
				
	//$('#containerformaillist').addClass('ajax_loader_image');
	//x_printMailList(mailBoxFolderID,returnWithMailList);
}
function addForward(thisAdd){
	$('.replysecondMenu').remove();
	$('#replyBottomMenu').remove();
	$('#reply').remove();
	$('#forward').remove();
	var composeLink = '<div style="overflow:hidden" class="replysecondMenu">';
        composeLink +='<div class="dashboardMenuLeft">';
        composeLink +='<ul><li class="composeMsg"><a  onclick="return sendMail()" style="cursor:pointer">Send</a></li>';
        composeLink +='<li class="composeMsg"><a onclick="return saveMail()" style="cursor:pointer">Save</a></li>'
       composeLink +='<li class="composeMsg"><a onclick="return discardMail()" style="cursor:pointer">Discard</a></li></ul></div></div>';
	   $(thisAdd).addClass('replyActive');
	   //$('.dashboardBottomMenu').append(composeLink);
	   $('.bodydashboard').append(composeLink);
	   var messageID = base64_decode($('#messageID').val());
	     var forReply = base64_encode('forward_'+messageID);
	 sajax_cancel();
	 sajax_init_object();
	x_phpComposeMail(forReply,ajaxReturnForwardMail);
}
function ajaxReturnForwardMail(z){
	var composeLink = '<div style="margin-top:20px;" class="dashboardBottomMenu" id="replyBottomMenu">';
 composeLink +='<div class="dashboardMenuLeft">';
composeLink +='<ul>';
   composeLink +='<li class="composeMsg"><a  onclick="return sendMail()" style="cursor:pointer">Send</a></li>';
  composeLink +='  <li class="composeMsg"><a onclick="return saveMail()" style="cursor:pointer">Save</a></li>'
  composeLink +='  <li class="composeMsg"><a onclick="return discardMail()" style="cursor:pointer">Discard</a></li></ul></div></div>';
 	$('.bodydashboard').append(z);
 	$('.bodydashboard').append(composeLink);
	var fromMail = $('#composeFrom').val();
	var toMail = $('#messageTo').val();
	var sentMail = $('#messageDate').val();
	var subjectMail = $('#messageSubject').val();
	var signatureMail = $('#signature').html();
	var mailContent = signatureMail;
	mailContent += '<br><hr><div class="TopViewfrom">';
	mailContent += '<h4><span style="font-wieght:bold">From: </span>'+fromMail+' </h4>';
	mailContent += '<h4><span style="font-wieght:bold">To: </span>'+toMail+'</h4>';
	mailContent += '<h4><span style="font-wieght:bold">Sent: </span>'+sentMail+'</h4>';
	mailContent += '<h4><span style="font-wieght:bold">Subject: </span>'+subjectMail+'</h4></div>';
	mailContent += $('.viewHi').find('.composeMail').html();
	editor = $('#editor').attr('id');
	createEditorComposeCompose(mailContent);
	getSeenMessage();
	paginationMailBox();
	paginationDropDown();
	showHideSideBar();
	createUploader();
	appendAdvancedSearchText();
}
function addReply(thisAdd){
	$('.replysecondMenu').remove();
	$('#replyBottomMenu').remove();
	$('#reply').remove();
	$('#forward').remove();
	var composeLink = '<div style="overflow:hidden" class="replysecondMenu">';
        composeLink +='<div class="dashboardMenuLeft">';
        composeLink +='<ul><li class="composeMsg"><a  onclick="return sendMail()" style="cursor:pointer">Send</a></li>';
        composeLink +='<li class="composeMsg"><a onclick="return saveMail()" style="cursor:pointer">Save</a></li>'
       composeLink +='<li class="composeMsg"><a onclick="return discardMail()" style="cursor:pointer">Discard</a></li></ul></div></div>';
	   $(thisAdd).addClass('replyActive');
	   //$('.dashboardBottomMenu').append(composeLink);
	   $('.bodydashboard').append(composeLink);
	    var messageID = base64_decode($('#messageID').val());
		var forReply = base64_encode('reply_'+messageID);
	 sajax_cancel();
	 sajax_init_object();
	x_phpComposeMail(forReply,ajaxReturnReplyMail);

}
function ajaxReturnReplyMail(z){
var composeLink = '<div style="margin-top:20px;" class="dashboardBottomMenu" id="replyBottomMenu">';
 composeLink +='<div class="dashboardMenuLeft">';
composeLink +='<ul>';
   composeLink +='<li class="composeMsg"><a  onclick="return sendMail()" style="cursor:pointer">Send</a></li>';
  composeLink +='  <li class="composeMsg"><a onclick="return saveMail()" style="cursor:pointer">Save</a></li>'
  composeLink +='  <li class="composeMsg"><a onclick="return discardMail()" style="cursor:pointer">Discard</a></li></ul></div></div>';
 	$('.bodydashboard').append(z);
 	$('.bodydashboard').append(composeLink);
	
	var fromMail = $('#composeFrom').val();
	var toMail = $('#messageTo').val();
	var sentMail = $('#messageDate').val();
	var subjectMail = $('#messageSubject').val();
	var signatureMail = $('#signature').html();
	var mailContent = signatureMail;
	mailContent += '<br><hr><div class="TopViewfrom">';
	mailContent += '<h4><span style="font-wieght:bold">From: </span>'+fromMail+' </h4>';
	mailContent += '<h4><span style="font-wieght:bold">To: </span>'+toMail+'</h4>';
	mailContent += '<h4><span style="font-wieght:bold">Sent: </span>'+sentMail+'</h4>';
	mailContent += '<h4><span style="font-wieght:bold">Subject: </span>'+subjectMail+'</h4></div>';
	mailContent += $('.viewHi').find('.composeMail').html();
	editor = $('#editor').attr('id');
	createEditorComposeCompose(mailContent);
	getSeenMessage();
	paginationMailBox();
	paginationDropDown();
	showHideSideBar();
	createUploader();
	appendAdvancedSearchText();
}
function downloadAttachment(attchmentID){
	uri = JSDownloadUrl+'/'+attchmentID;
	var downloadWindow = window.open(uri,'popup_player','height=400,width=550,top=150,left=300,scrollbars=yes');

}
function checkNeedUpdateMailList(){
	//alert('ok');
	x_needAjaxCallOrNot(returnNeedAjaxCall);
	//setTimeout('updateMailList()', 5000);
}
function returnNeedAjaxCall(z){
	domainID = z;
}
function ajaxReturnCMail(z){
$('.moveToFolder').attr('lang','mailCompose');
$('.dashboardMenuRight ul li').css('display','none');
	$('.replysecondMenu').remove();
	$('#replyBottomMenu').remove();
	$('#reply').remove();
	$('#forward').remove();
	//var composeLink = '<li class="composeMsg"><a  onclick="return sendMail()" style="cursor:pointer">Send</a></li>';
      //  composeLink +='<li class="composeMsg"><a onclick="return saveMail()" style="cursor:pointer">Save</a></li>'
      //  composeLink +='<li class="composeMsg"><a onclick="return discardMail()" style="cursor:pointer">Discard</a></li>';
	
	$('.dashboardMenuLeft ul li.viewMsg').remove();
	$('.dashboardMenuLeft ul li.listMsg').css('display','none');
	$('.mailNav').css('display','none');
	$('.dashboardMenuLeft ul li.composeMsg').css('display','inline');
	$('#containerformaillist').removeClass('ajax_loader_image');
	$('#forMailDetails').html('');
	$('#forMailDetails').html(z);
	var signatureValue = $('#signature').html();
	var mailContent = signatureValue;
	//var mailContent = '<div style="margin-top:5px"></div><div id="signatureAreaForOurSite">'+signatureValue+'</div>';
	editor = $('#editor').attr('id');
	createEditorComposeCompose(mailContent);
	getSeenMessage();
	paginationMailBox();
	paginationDropDown();
	showHideSideBar();
	createUploader();
	appendAdvancedSearchText();
	
	$.getScript(JSCONFJSDIR+"jquery.ezmark.js");
	$.getScript(JSCONFJSDIR+"jquery.ezmark.min.js");
	$.getScript(JSCONFJSDIR+"designerScript.js");
	
	
	var getIdentifyAdvanceSearch = identifyAdvanceSearch();
	if(getIdentifyAdvanceSearch == 'advanceSearch'){					
		recallAdvanceSearch();
	}else if(getIdentifyAdvanceSearch == 'normalSearch'){
		recallNormalSearch();
	}
	
	//
	$("#composeTo").autocomplete(composeContactUrl, {
		width: 240,
		matchContains: true,
		selectFirst: false,
		makeOn : 'composeTo'
	});
	$("#composeToCC").autocomplete(composeContactUrl, {
		width: 240,
		matchContains: true,
		selectFirst: false,
		makeOn : 'composeToCC'
	});
	$("#composeToBCC").autocomplete(composeContactUrl, {
		width: 240,
		matchContains: true,
		selectFirst: false,
		makeOn : 'composeToBCC'
	});
	//
}

$('#composeFromAccount span').live('click', function(){
	var signatureValue = base64_decode($(this).attr('rel'));
	var thisValue = $(this).text();
	var thisHtml = $(this).html();
	var updateSignatureVal = base64_encode($('#signature').html());
	var langValue = base64_encode('domainID_'+$(this).attr('lang'));
	var fromEmailId = $('#composeFromHtml').html();
	var hdomainIDValue = base64_decode($('#hdomainID').val()).split('_');
	$(this).attr('lang',hdomainIDValue[1]);
	$(this).attr('rel',updateSignatureVal);
	$('#hdomainID').val(langValue);
	$(this).html(fromEmailId);
	$('#composeFrom').val(thisValue);
	$('#composeFromHtml').html(thisHtml);
	$('#signature').html('');
	$('#signature').html(signatureValue);
	$('iframe').contents().find('#signatureAreaForOurSite').remove();
	$('iframe').contents().find('body').append('<div id="signatureAreaForOurSite">'+signatureValue+'</div>');
	//$('iframe').contents().find('#signatureAreaForOurSite').html(signatureValue);
	
	var wholeMessage = instance.getData();
	$(this).parents('.drowpDownCont').css('display', 'none');
 });


function createEditorComposeCompose(mailContent){
	//$.getScript(JSCONFJSDIR+"ckeditor/ckeditor.js");
	 instance = CKEDITOR.instances[editor];
		if(instance)
		{
			CKEDITOR.remove(instance);
		}
		//CKEDITOR.replace(editor);
	// Create a new editor inside the <div id="editor">, setting its value to html
	//var config = {};
	//editor = CKEDITOR.appendTo( 'editor', config, html );
	instance = CKEDITOR.replace( editor,
			{
				toolbar: [
					['Font','FontSize','Bold','Italic','Underline','Undo','Redo','-','Find','Replace','-','SelectAll','Strike','-','NumberedList','BulletedList','-','Outdent','Indent','Blockquote','-',
					'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','TextColor','BGColor','RemoveFormat','Indent1', 'Indent2', 'Indent3', 'SpellChecker']
				 ],
			});
	if(mailContent !=null && mailContent !=''){
		instance.setData(mailContent);
	}
}

function sendMail(){
	if ( !instance )
		return;

	// Retrieve the editor contents. In an Ajax application, this data would be
	// sent to the server or used in any other way.
	var fileInProcess = $('.qq-upload-process').size();
	if(fileInProcess == 0){
		from = $('#composeFrom').val();
		tempDir = $('#tmpFolder').val();
		domainArray = base64_decode($('#hdomainID').val()).split('_');
		domainID = domainArray[1];
		message = instance.getData();
		var to = jQuery.trim($('#composeTo').val());
		var cc = jQuery.trim($('#composeToCC').val());
		var bcc = jQuery.trim($('#composeToBCC').val());
		var subject = $('#composeSubject').val();
		//alert(domainID);
		//alert(from);alert(to);alert(subject);alert(message);
		if(to == '' || to == null){
			alert('Please specify at least one recipient.');
			$('#composeTo').focus();
			return false;
		}else{
			toArray = to.split(';');
			if(toArray.length>1){
				for(i = 0; i<toArray.length;i++){
					testEmailID = jQuery.trim( toArray[i] );
					if(i == (toArray.length -1)){
						if(testEmailID == '' || testEmailID == null){
						
						}else{
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
								alert('The address '+toArray[i]+' in the \" To \" field was not recognized. Please make sure that all addresses are properly formed.');
								$('#composeTo').focus();
								return false;
							}
						}
					
					}else{
						if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
							alert('The address '+toArray[i]+' in the \" To \" field was not recognized. Please make sure that all addresses are properly formed.');
							$('#composeTo').focus();
							return false;
						}
					}
				}
			}else{
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(to)) {
					alert('The address '+to+' in the \" To \" field was not recognized. Please make sure that all addresses are properly formed.');
					$('#composeTo').focus();
					return false;
				}	
			}
			if(cc =='' || cc ==null){
				
			}else{
				ccArray = cc.split(';');
				if(ccArray.length>1){
					for(i = 0; i<ccArray.length;i++){
						testEmailID = jQuery.trim( ccArray[i] );
						if(i == (ccArray.length -1)){
						if(testEmailID == '' || testEmailID == null){
						
						}else{
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
								alert('The address '+ccArray[i]+' in the \" CC \" field was not recognized. Please make sure that all addresses are properly formed.');
								$('#composeTo').focus();
								return false;
							}
						}
					
						}else{
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
								alert('The address '+ccArray[i]+' in the \" CC \" field was not recognized. Please make sure that all addresses are properly formed.');
								$('#composeToCC').focus();
								return false;
							}
						}
					}
				}else{
					if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(cc)) {
						alert('The address '+cc+' in the \" CC \" field was not recognized. Please make sure that all addresses are properly formed.');
						$('#composeToCC').focus();
						return false;
					}	
				}
			}
			if(bcc =='' || bcc ==null){
				
			}else{
				bccArray = bcc.split(';');
				if(bccArray.length>1){
					for(i = 0; i<bccArray.length;i++){
						testEmailID = jQuery.trim( bccArray[i] );
						if(i == (bccArray.length -1)){
						if(testEmailID == '' || testEmailID == null){
						
						}else{
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
								alert('The address '+bccArray[i]+' in the \" BCC \" field was not recognized. Please make sure that all addresses are properly formed.');
								$('#composeTo').focus();
								return false;
							}
						}
					
						}else{
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
								alert('The address '+bccArray[i]+' in the \" BCC \" field was not recognized. Please make sure that all addresses are properly formed.');
								$('#composeToBCC').focus();
								return false;
							}
						}
					}
				}else{
					if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(bcc)) {
						alert('The address '+bcc+' in the \" BCC \" field was not recognized. Please make sure that all addresses are properly formed.');
						$('#composeToBCC').focus();
						return false;
					}	
				}
			}
			$('#containerformaillist').addClass('ajax_loader_image');
			x_sendMailAjax(from,to,subject,message,tempDir,domainID,cc,bcc,returnAjaxSendMail);
		}
	}else{
		$('#containerformaillist').addClass('ajax_loader_image');
		setTimeout('sendMail()',1000);
	}
	// Destroy the editor.
	
}
function discardMail(){
	$('#containerformaillist').addClass('ajax_loader_image');
	window.location.hash =	$('#discardHashVal').val();
}
function saveMail(){
	if ( !instance )
		return;

	// Retrieve the editor contents. In an Ajax application, this data would be
	// sent to the server or used in any other way.
	
	from = $('#composeFrom').val();
	tempDir = $('#tmpFolder').val();
	domainArray = base64_decode($('#hdomainID').val()).split('_');
	domainID = domainArray[1];
	message = instance.getData();
	var to = jQuery.trim($('#composeTo').val());
	var cc = jQuery.trim($('#composeToCC').val());
	var bcc = jQuery.trim($('#composeToBCC').val());
	var subject = $('#composeSubject').val();
	//alert(from);alert(to);alert(subject);alert(message);
	if(to == '' || to == null){
		alert('Please specify at least one recipient.');
		$('#composeTo').focus();
		return false;
	}else{
		toArray = to.split(';');
		if(toArray.length>1){
			for(i = 0; i<toArray.length;i++){
				testEmailID = jQuery.trim( toArray[i] );
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
					alert('The address '+toArray[i]+' in the \" To \" field was not recognized. Please make sure that all addresses are properly formed.');
					$('#composeTo').focus();
					return false;
				}
			}
		}else{
			if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(to)) {
				alert('The address '+to+' in the \" To \" field was not recognized. Please make sure that all addresses are properly formed.');
				$('#composeTo').focus();
				return false;
			}	
		}
		if(cc =='' || cc ==null){
			
		}else{
			ccArray = cc.split(';');
			if(ccArray.length>1){
				for(i = 0; i<ccArray.length;i++){
					testEmailID = jQuery.trim( ccArray[i] );
					if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
						alert('The address '+ccArray[i]+' in the \" CC \" field was not recognized. Please make sure that all addresses are properly formed.');
						$('#composeToCC').focus();
						return false;
					}
				}
			}else{
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(cc)) {
					alert('The address '+cc+' in the \" CC \" field was not recognized. Please make sure that all addresses are properly formed.');
					$('#composeToCC').focus();
					return false;
				}	
			}
		}
		if(bcc =='' || bcc ==null){
			
		}else{
			bccArray = bcc.split(';');
			if(bccArray.length>1){
				for(i = 0; i<bccArray.length;i++){
					testEmailID = jQuery.trim( bccArray[i] );
					if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(testEmailID)) {
						alert('The address '+bccArray[i]+' in the \" BCC \" field was not recognized. Please make sure that all addresses are properly formed.');
						$('#composeToBCC').focus();
						return false;
					}
				}
			}else{
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(bcc)) {
					alert('The address '+bcc+' in the \" BCC \" field was not recognized. Please make sure that all addresses are properly formed.');
					$('#composeToBCC').focus();
					return false;
				}	
			}
		}
		$('#containerformaillist').addClass('ajax_loader_image');
		x_saveMailAjax(from,to,subject,message,tempDir,domainID,cc,bcc,returnAjaxSaveMail);
	}
	// Destroy the editor.
	
}
function returnAjaxSaveMail(z){
	if(z){
		$('#containerformaillist').removeClass('ajax_loader_image');
		window.location.hash = z;
	}else{
		alert('mailnotsaved');
	}
}
function returnAjaxSendMail(z){
	if(z){
		$('#containerformaillist').removeClass('ajax_loader_image');
		window.location.hash =	$('#discardHashVal').val();
	}else{
		$('#containerformaillist').removeClass('ajax_loader_image');
		window.location.hash =	$('#discardHashVal').val();
	}
	
}

appendAdvancedSearchText();


function appendFilterSearchText(){
	$("#appendFilterSearchText").click(function(){//alert('ok');	
			
			//$("#dashboardMenu").append('<span class="error" id="untilError" style="padding-left:70px;">Please enter only digits.</span>');		
	});
};

function showSideText(){
	if($('#hideSideBar').is(':hidden') ){
		$('#showSideBar').css('display', 'inline');
	}
	
};


$('.composeFromContact').live('mouseover', function(){
	
	var fromMailWidth = $(this).outerWidth();
	//$(this).find('.drowpDownCont').css({display:'block', width:fromMailWidth});
	$(this).find('.drowpDownCont').css({display:'block'});
		
	var thisAnchorWidth = $(this).find('.drowpDownCont').prev('a').outerWidth();
	$(this).find('.drowpDownCont label img').css({left:thisAnchorWidth-20});
	
	if ($.browser.msie) {
		$('.compose_dropdown .drowpDown').boxShadow( 0,  0, 5, "#c4c3c3");
	};
}).live('mouseout', function(){
	$(this).find('.drowpDownCont').css('display', 'none');
	if ($.browser.msie) {
		$(this).find('.drowpDown').next('div').remove();
	};
});
$('.drowpDown span').live('click', function(){
	$(this).parents('li').find('.drowpDownCont').css('display', 'none');
});


$('#showCc').live('click', function(){
	$('#addCcId').css('display', 'block');
	$(this).hide();
	$('#showBcc').css({border:'none', padding:0});
 });

$('#showBcc').live('click', function(){
	$('#addBccId').css('display', 'block');
	$(this).hide();
	$('#showCc').css({border:'none', padding:0});
 });


function resetSearchAndFilter(form) {
	$(':input', form).each(function() {
		
		var type = this.type;
		var tag = this.tagName.toLowerCase();
		
		if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'hidden'){
		  this.value = "";
		}
		
		var matchAllAccount = $('#advanceAllAcountHtml').html();
		var findLangVal = $('.compose_dropdown .drowpDown span:contains(All Account)').attr('lang');
		$('.compose_dropdown .drowpDown span:eq('+findLangVal+')').html(matchAllAccount);
		//$('#advanceAllAcountHtml').text('All Account');
		
		if($('.inputCheckBox').find('input').attr('checked', false)){
			$('.inputCheckBox').removeClass('inputCheckBoxChecked');
		}
		$('.resultsAddClass').text('');
		
	});
};


// Advanced search start
	
	
	
	
	
$('#doAdvancedSearch').live('click', function(){	
		doAdvancedSearch();
});		
$('#fromSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});	
$('#toSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});
$('#subjectSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});
$('#keywordsSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});
$('#startDateSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});
$('#endDateSearch').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doAdvancedSearch();
	}		
});
			
function doAdvancedSearch(){
		$('#normalSearchDiv').css('display', 'none');
		
		var activeDomainID = $('#activeDomainID').val();
		
		var domainLangValue = $('#advanceAllAcountValue').val().split('_'); 
		var advanceAllAcountValue = domainLangValue[0];
		if(domainLangValue[1] == 'all'){
			dashboardUrl = dashboardUrl+"#";
		}else{
			dashboardUrl = dashboardUrl+"/"+domainLangValue[1]+"#";
		}
		
		var fromSearch = $.trim($('#fromSearch').val());
		var toSearch = $.trim($('#toSearch').val());
		var subjectSearch = $.trim($('#subjectSearch').val());
		var keywordsSearch = $.trim($('#keywordsSearch').val());
		var startDateSearch = $('#startDateSearch').val();
		var endDateSearch = $('#endDateSearch').val();		
		
		if($('#attachmentSearch').attr('checked') == true){
			var attachmentSearch = $('#attachmentSearch').val();
		}else{
			var attachmentSearch = '';
		}		
		
		var url = $.param.fragment();  
		urlSplit = url.split('/');
		var allUrl = 'd_'+advanceAllAcountValue+'|f_'+fromSearch+'|t_'+toSearch+'|s_'+subjectSearch+'|k_'+keywordsSearch+'|st_'+startDateSearch+'|e_'+endDateSearch+'|a_'+attachmentSearch;
		allUrl = base64_encode(allUrl);	
		var forAdvanceSearch = base64_encode('advanceSearch');
		url = urlSplit[0]+'/'+forAdvanceSearch+'/'+allUrl;
		
		if(activeDomainID == '0' || activeDomainID == advanceAllAcountValue){		
			//alert('if');			
			window.location.hash = url;			
			
		}else{
		
			//alert(dashboardUrl);	
			window.location.hash = '';			
			document.location.href = dashboardUrl+url;
		}
}
		
	
	
	$('#resetAdvancedSearch').live('click', function(){		
		resetSearchAndFilter($('#advancedSearchForm'));		
	});
	
// Advanced search end



// Normal search start

$('.doNormalSearch1').live('keyup', function(e){	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 
		doNormalSearch();
	}		
});
$('.doNormalSearch2').live('click', function(e){
	doNormalSearch();
});
	
function doNormalSearch(){
	
	var getSearchText = $.trim($('#getSearchText').val());	
	var forNormalSearch = base64_encode('normalSearch');
	
	var getDashboardSearchUrl = dashboardSearchUrl.split('#@#');
	if(getDashboardSearchUrl[0] == 'dashboard'){
		var allUrl = 'text_'+getSearchText+'|d_'+DOMAINID;		
		var url = $.param.fragment();  
		urlSplit = url.split('/');
		url = urlSplit[0]+'/'+forNormalSearch+'/'+base64_encode(allUrl);
		window.location.hash = url;	
	}else{ 
		var allUrl = 'text_'+getSearchText;		
		url = getDashboardSearchUrl[1]+'/'+forNormalSearch+'/'+base64_encode(allUrl);
		window.location.hash = '';			
		document.location.href = url;
	}
}	

// Normal search end

var advanceSearchHtml = $('#advancedSearchDiv');
function recallAdvanceSearch(){
	
	//$('head').append('<link rel="stylesheet" type="text/css" href="/najmail/templates/default/jquery-ui-1.8.16.custom.css" />');
	
	$('body').find('.dashboardMenu').after($(advanceSearchHtml));
	$('#advancedSearchDiv').slideDown('slow');		
	
	/*$.getScript(JSCONFJSDIR+"fullcalendar.min.js");
	$.getScript(JSCONFJSDIR+"jquery-ui-1.8.11.custom.min.js");
	$.getScript(JSCONFJSDIR+"jquery-ui-1.8.16.custom.min.js");	
	$.getScript(JSCONFJSDIR+"datepicker.js");
	//$.getScript(JSCONFJSDIR+"jquery-full-init.js");	
	//$("#startDateSearch, #endDateSearch").datepicker();*/
	
	
	
	
	
	var forAdvanceSearch = base64_encode('advanceSearch');
	var url = $.param.fragment(); 
	var urlSplit = url.split("/");	
	if(urlSplit.length>1){
		chkUrl = urlSplit[1];
		if(chkUrl == forAdvanceSearch){				
			if(urlSplit.length >= 3){ 
					var urlSplit1 = base64_decode(urlSplit[2]).split("|");
					var dArray = urlSplit1[0].split("_");
					var fArray = urlSplit1[1].split("_");
					var tArray = urlSplit1[2].split("_");
					var sArray = urlSplit1[3].split("_");
					var kArray = urlSplit1[4].split("_");
					var stArray = urlSplit1[5].split("_");
					var eArray = urlSplit1[6].split("_");
					var aArray = urlSplit1[7].split("_");					
					
					var addStr1 = 'Results for ';
					var addStr2 = '';
					
					$('#fromSearch').attr('value',fArray[1]);
					$('#toSearch').attr('value',tArray[1]);
					$('#subjectSearch').attr('value',sArray[1]);
					$('#startDateSearch').attr('value',stArray[1]);
					$('#endDateSearch').attr('value',eArray[1]);
					$('#keywordsSearch').attr('value',kArray[1]);
					
					if(fArray[1] != ''){						
						addStr2 += 'from:'+fArray[1]+' ';										
					}
					if(tArray[1] != ''){						
						addStr2 += 'to:'+tArray[1]+' ';										
					}
					if(sArray[1] != ''){						
						addStr2 += 'subject:'+sArray[1]+' ';										
					}
					if(kArray[1] != ''){						
						addStr2 += kArray[1]+' ';										
					}
					if(aArray[1] != ''){
						$('#attachmentSearch').parent().addClass('inputCheckBoxChecked');
						addStr2 += 'has:attachment ';
					}	
					
					
					if(addStr2 != ''){						
						var addStr = addStr1+addStr2;						
						$('.resultsAddClass').text(addStr);					
					}else{
						$('.resultsAddClass').text('');
					}
			}
		}
	}	
}

var normalSearchHtml = $('#normalSearchDiv');
function recallNormalSearch(){ 	
	
	var forNormalSearch = base64_encode('normalSearch');
	var url = $.param.fragment(); 
	var urlSplit = url.split("/");	
	if(urlSplit.length>1){
		chkUrl = urlSplit[1];
		if(chkUrl == forNormalSearch){				
			if(urlSplit.length >= 3){
				var urlSplit1 = base64_decode(urlSplit[2]).split("|");
				var urlSplit2 = urlSplit1[0].split("_");
				$('#getSearchText').attr('value',urlSplit2[1]);		
				if(urlSplit2[1] != ''){
					$('body').find('.dashboardMenu').after($(normalSearchHtml));
					$('#normalSearchDiv').slideDown('slow');
					$('.resultsAddNormalClass').text('Results for "'+urlSplit2[1]+'"');	
				}
			}
		}
	}	
}


function appendAdvancedSearchText()
{
	$('#appendAdvancedSearchText').live('click', function(){
	$('body').find('.dashboardMenu').after($(advanceSearchHtml));
	$('#advancedSearchDiv').slideDown('slow');
	
	});
	
	$('#cancelAdvancedSearch').live('click', function(){
		$('#advancedSearchDiv').slideUp('slow');
		resetSearchAndFilter($('#advancedSearchForm'));
	});
}
function identifyAdvanceSearch()
{ 
	var div = 'hide';
	var forNormalSearch = base64_encode('normalSearch');
	var forAdvanceSearch = base64_encode('advanceSearch'); 
	var url = $.param.fragment();
	if(url != ''){
		var urlSplit = url.split("/");	
		if(urlSplit.length>1){
			
			chkUrl = urlSplit[1];
			if(chkUrl == forAdvanceSearch){
				var div = 'advanceSearch';
			}else if(chkUrl == forNormalSearch){
				var div = 'normalSearch';
			}
		}
	}	
	return div;
}


function callMarkAsReadAjax(str){
	$('#containerformaillist').addClass('ajax_loader_image');
	x_markAsReadAjax(str,returnMarkAsReadAjax);

}
function returnMarkAsReadAjax(z){	
	$('#containerformaillist').removeClass('ajax_loader_image');
	var condition = $('.moveToFolder').attr('lang');
	var finalUrl = '';
	if(condition == 'mailContent'){
		var url = $.param.fragment();
		var urlArray = explode('/',url);
		for(i=0;i<(count(urlArray)-1);i++){
			finalUrl +=urlArray[i];
			if(i<(count(urlArray)-2))
			finalUrl +='/';
		}
	}else{
		finalUrl = $.param.fragment();
	}
	
	//alert(finalUrl);	
	window.location.hash = '';
	window.location.hash = finalUrl;	
}
$('.markAllAsRead').live('click', function(e){
	
	$('.mailNav .column_1 input[type=checkbox]').attr('checked', true);
	$('.mailNav .column_1 input[type=checkbox]').parent().addClass('inputCheckBoxChecked');
	
	$('.mailCont ul li .column_1 input[type=checkbox]').attr('checked', true);
	$('.mailCont ul li .column_1 input[type=checkbox]').parent().addClass('inputCheckBoxChecked');
			
	var str = getMarkAsReadAjax();
	//alert(str);
	
	if(str != ''){
		var str = 'read#@#'+str;
		callMarkAsReadAjax(str);		
	}else{
	 	messageFlash2('Please select at least one mail.');
		//alert('Please select at least one mail.');	
		return false;
	}	
});
$('.markAsRead').live('click', function(e){
	var condition = $(this).attr('lang');
	if(condition == 'mailList'){
		var str = getMarkAsReadAjax();
		//alert(str);
		
		if(str != ''){
			var str = 'read#@#'+str;
			callMarkAsReadAjax(str);		
		}else{
			messageFlash2('Please select at least one mail.');
			//alert('Please select at least one mail.');	
			return false;
		}
	}else{
		if(condition == 'mailContent'){
			var str = $('#forMoveToID').val();
			var str = 'read#@#'+str;
			callMarkAsReadAjax(str);
		}
	}
});
$('.markAsUnRead').live('click', function(e){
	var condition = $(this).attr('lang');
	if(condition == 'mailList'){
		var str = getMarkAsReadAjax();
		//alert(base64_decode(str)); return false;
		
		if(str != ''){
			var str = 'unread#@#'+str;
			callMarkAsReadAjax(str);		
		}else{
			messageFlash2('Please select at least one mail.');
			//alert('Please select at least one mail.');	
			return false;
		}
	}else{
		if(condition == 'mailContent'){
			var str = $('#forMoveToID').val();
			var str = 'unread#@#'+str;
			callMarkAsReadAjax(str);
		}
	}
});
$('.addStar').live('click', function(e){
	var condition = $(this).attr('lang');
	if(condition == 'mailList'){
		var str = getMarkAsReadAjax();
		//alert(str);
		
		if(str != ''){
			var str = 'addStar#@#'+str;
			callMarkAsReadAjax(str);		
		}else{
			messageFlash2('Please select at least one mail.');
			//alert('Please select at least one mail.');	
			return false;
		}
	}else{
		if(condition == 'mailContent'){
			var str = $('#forMoveToID').val();
			var str = 'addStar#@#'+str;
			callMarkAsReadAjax(str);
		}
	}
});
$('.removeStar').live('click', function(e){
	var condition = $(this).attr('lang');
	if(condition == 'mailList'){
		var str = getMarkAsReadAjax();
		//alert(str);
		
		if(str != ''){
			var str = 'removeStar#@#'+str;
			callMarkAsReadAjax(str);		
		}else{
			messageFlash2('Please select at least one mail.');
			//alert('Please select at least one mail.');	
			return false;
		}
	}else{
		if(condition == 'mailContent'){
			var str = $('#forMoveToID').val();
			var str = 'removeStar#@#'+str;
			callMarkAsReadAjax(str);
		}
	}	
});

$('.deleteMails').live('click', function(e){
	var chkCon = '';
	var condition = $(this).attr('lang');
	var getAllTrashID = base64_decode($(this).attr('rel'));
	alert(getAllTrashID);
	if(condition == 'mailList'){
		var sizecheck = $('.mailCont ul li .column_1 input[type=checkbox]').attr('checked', true).size();
		for(i=1;i<=sizecheck;i++){		
			if($('#emailValue_'+i).parents('li').find('input').parent().hasClass('inputCheckBoxChecked'))
			{
				var checkAttr = $('#emailValue_'+i).parents('li').find('.inputCheckBoxChecked input').val();
				
				var getID = base64_decode(checkAttr).split('|');
				var chkID = getID[3].split('_');
				if( in_array(chkID[1], getAllTrashID.split(',')) ){
					chkCon = 'Delete';
				}else{
					chkCon = 'Trash';
				}
				//alert(getAllTrashID); alert(base64_decode(checkAttr)); alert(chkCon); return false;
			}
		}	
		//alert(chkCon); return false;
		
		if(chkCon == ''){
			messageFlash2('Please select at least one mail.');
			//alert('Please select at least one mail.');	
			return false;
		}else if(chkCon == 'Delete'){
			var str = getMarkAsReadAjax();
			//alert(base64_decode(str)); return false;
			
			if(str != ''){
				var str = 'deleteMails#@#'+str;
				callMarkAsReadAjax(str);		
			}else{
				messageFlash2('Please select at least one mail.');
				//alert('Please select at least one mail.');	
				return false;
			}
		}else if(chkCon == 'Trash'){
			var str = '';
			var chkStr = 'ok';
			
			var sizecheck = $('.mailCont ul li .column_1 input[type=checkbox]').attr('checked', true).size();
			var j = 1;
			for(i=1;i<=sizecheck;i++){	
			
				if($('#emailValue_'+i).parents('li').find('input').parent().hasClass('inputCheckBoxChecked'))
				{
					var checkAttr = $('#emailValue_'+i).parents('li').find('.inputCheckBoxChecked input').val();
					str += checkAttr+',';
						
					var urlSplit2 = base64_decode(checkAttr).split("|");
					var dArray = urlSplit2[6].split("_");
					var compareTo = dArray[1];
					
					if( (j == 1) ){
						var compareWith = compareTo;				
					}	
					
					if(compareWith != compareTo){
						var chkStr = '';
					}
					j++;
				}
			}if(str != ''){
				str = str.substring(0, str.length - 1);	
			}
			
			
			if(chkStr != ''){
				if(str != ''){
					var str = 'moveToFolder#@#'+str+'#@#'+base64_encode('b_Trash');  
					//alert(str); return false;
					callMarkAsReadAjax(str);		
				}else{
					messageFlash2('Please select at least one mail.');
					//alert('Please select at least one mail.');	
					return false;
				}	
			}else{
				messageFlash2('Selected mails are of different account.');
				//alert('Mail are different from the domain.');	
				return false;
			}
		}
	}else{
		if(condition == 'mailContent'){
			var str = $('#forMoveToID').val();
			var moveMessageID = base64_decode($('#forMoveToID').val());
			var getID = moveMessageID.split('|');
				var chkID = getID[3].split('_');
				if( in_array(chkID[1], getAllTrashID.split(',')) ){
					var str = 'deleteMails#@#'+str;
					callMarkAsReadAjax(str);				
				}else{
					var str = 'moveToFolder#@#'+str+'#@#'+base64_encode('b_Trash');  
					//alert(str); return false;
					callMarkAsReadAjax(str);
				}
				
		}
	}
});

function getMarkAsReadAjax(){
	
	var str = '';
	var sizecheck = $('.mailCont ul li .column_1 input[type=checkbox]').attr('checked', true).size();
	
	for(i=1;i<=sizecheck;i++){		
		if($('#emailValue_'+i).parents('li').find('input').parent().hasClass('inputCheckBoxChecked'))
		{
			var checkAttr = $('#emailValue_'+i).parents('li').find('.inputCheckBoxChecked input').val();
			str += checkAttr+',';
		}
	}
	if(str != ''){
		str = str.substring(0, str.length - 1);	
	}
	
	return str;
}

$('.moveToFolder').live('click', function(e){
	var str = '';
	var condition = $(this).attr('lang');
	var chkStr = 'ok';
	var urlSplit1 = base64_decode($(this).attr('rel')).split("|");	
	var bArray = urlSplit1[0].split("_");
	if(condition == 'mailList'){
		
		//alert(base64_decode($(this).attr('rel'))); alert(bArray[1]); return false;
		
		
		var sizecheck = $('.mailCont ul li .column_1 input[type=checkbox]').attr('checked', true).size();
		var j = 1;
		for(i=1;i<=sizecheck;i++){	
		
			if($('#emailValue_'+i).parents('li').find('input').parent().hasClass('inputCheckBoxChecked'))
			{
				var checkAttr = $('#emailValue_'+i).parents('li').find('.inputCheckBoxChecked input').val();
				str += checkAttr+',';
					
				var urlSplit2 = base64_decode(checkAttr).split("|");
				var dArray = urlSplit2[6].split("_");
				var compareTo = dArray[1];
				
				//alert(base64_decode(checkAttr)); alert(compareTo); 
				
				if( (bArray[1] == 'Spam') && (j == 1) ){ 
					var compareWith = compareTo;				
				}else if(bArray[1] != 'Spam'){
					var dArray = urlSplit1[1].split("_");
					var compareWith = dArray[1];
				}
				//alert(compareWith);
				//alert(compareTo);return false;
				if(compareWith != compareTo){
					var chkStr = '';
				}
				j++;
			}
		}
		if(str != ''){
			str = str.substring(0, str.length - 1);	
		}
		
		
		if(chkStr != ''){
			if(str != ''){
				//alert(base64_decode(str));
				var str = 'moveToFolder#@#'+str+'#@#'+base64_encode(urlSplit1[0]);  
				// return false;
				callMarkAsReadAjax(str);		
			}else{
				messageFlash2('Please select at least one mail.');
				//alert('Please select at least one mail.');	
				return false;
			}	
		}else{
			messageFlash2('Selected mail and move to folder are from different account.');
			//alert('Mail are different from the domain.');	
			return false;
		}
	}else{
		if(condition == 'mailContent'){
			if(bArray[1] == 'Spam'){
				var moveMessageID = $('#forMoveToID').val();
				var str = 'moveToFolder#@#'+moveMessageID+'#@#'+base64_encode(urlSplit1[0]);  
				//alert(str); return false;
				callMarkAsReadAjax(str);
			}else{
				var sArray = urlSplit1[1].split("_");
				var toMoveSID = sArray[1];
				var fromMoveSID = $('#currentSocialMediaID').val();
				if(toMoveSID == fromMoveSID){
					var moveMessageID = $('#forMoveToID').val();
					var str = 'moveToFolder#@#'+moveMessageID+'#@#'+base64_encode(urlSplit1[0]);  
					//alert(str); return false;
					callMarkAsReadAjax(str);
				}else{
					messageFlash2('Selected mail and move to folder are from different account.');
					//alert('Mail are different from the domain.');	
					return false;
				}
			}
		}	
	}	
	
});

$('.qq-upload-delete').live('click', function(e){
											  
	var str = '';
	
	var tmpFolder = base64_decode($('#tmpFolder').val());
	var uploadedFileName = $(this).parents('li').find('.qq-upload-file').text();	
	$(this).parents('li').addClass('deleteCurFile');
	//alert(uploadedFileName); return false;
	str = tmpFolder+'#@#'+uploadedFileName;
	callDeleteAttachementAjax(str);
});	
function callDeleteAttachementAjax(str){
	
	x_deleteAttachementAjax(str,returnDeleteAttachementAjax);
}
function returnDeleteAttachementAjax(z){	
	//alert(z);
	$('.deleteCurFile').remove();
}
function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
$('.prevContent').live('click', function(){
	var contentValue = $(this).attr('rel');
	var url = $.param.fragment();
	var urlArray = explode('/',url);
	var finalUrl = '';
	for(i=0;i<(count(urlArray)-1);i++){
		finalUrl +=urlArray[i]+'/';
	}
	finalUrl = finalUrl+contentValue;
	//alert(base64_decode(finalUrl));
	window.location.hash = '';
	window.location.hash = finalUrl;
});
$('.nextContent').live('click', function(){
	var contentValue = $(this).attr('rel');
	var url = $.param.fragment();
	var urlArray = explode('/',url);
	var finalUrl = '';
	for(i=0;i<(count(urlArray)-1);i++){
		finalUrl +=urlArray[i]+'/';
	}
	finalUrl = finalUrl+contentValue;
	//alert(base64_decode(finalUrl));
	window.location.hash = '';
	window.location.hash = finalUrl;
});
function messageFlash2(msg){
	$(".box_warning").html(msg).fadeIn(2000).fadeOut(2000);
}
function evalScript(scripts)
{	try
	{	if(scripts != '')	
		{	var script = "";
			scripts = scripts.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
	       	                         if (scripts !== null) 
										script += arguments[1] + '\n';
										return '';});
			
			if(script) (window.execScript) ? window.execScript(script) : window.setTimeout(script, 0);
		}
		return scripts;
	}
	catch(e)
	{	alert(e)
	}
}
function getCorrectStrToTime(dateFormate){
//alert(dateFormate);
		if(dateFormate !=""){
			//dateArray = explode(' ',dateFormate);
			dateArray = dateFormate.split(' ');
			alert(dateArray);
			date = dateArray[0]+', '+dateArray[1]+' '+dateArray[2]+' '+dateArray[3]+' '+dateArray[4];
			//return date;
			alert(date);
			//return strtotime(date);
		}
	
	}	
	
function addAllJS(){
	
	$.getScript(JSCONFJSDIR+"jquery.ezmark.js");
	$.getScript(JSCONFJSDIR+"jquery.ezmark.min.js");
	$.getScript(JSCONFJSDIR+"designerScript.js");
	$.getScript(JSCONFJSDIR+"jquery-full-init.js");
	//$.getScript(JSCONFJSDIR+"calendar.js");
	$.getScript(JSCONFJSDIR+"jquery.simpleColor.js");
	/* Code For Color Picker*/
		$('.simple_color').simpleColor({
			cellWidth: 10,
			cellHeight: 10,
			border: '1px solid #e6e6e6',
			buttonClass: 'button',
		});
	/* Code For Color Picker*/	
}