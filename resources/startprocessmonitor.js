'use strict';
/**
 *
 */

(function() {


var appCommand = angular.module('startprocessapp', ['googlechart', 'ui.bootstrap']);






// --------------------------------------------------------------------------
//
// Controler Ping
//
// --------------------------------------------------------------------------

// Ping the server
appCommand.controller('StartProcess',
	function ( $http, $scope, $sce ) {

	this.listprocesses ={};
	
	this.getlistprocesses = function() {
		var self=this;
	
		$http.get( '../API/system/session/1' )
			.success( function ( jsonResult ) {
				self.userid= jsonResult.user_id;
				$http.get( '../API/bpm/process?p=0&c=100&o=displayName%20ASC&f=user_id%3d'+self.userid )
					.success( function ( jsonResultProcess ) {
						self.listprocesses 		= jsonResultProcess;
					})
					.error( function() {
						alert('an error occure get list process');
						});
			})
			.error( function() {
						alert('an error occure get session');
						});
			
				
	};
	
	this.getlistprocesses();
	
	this.urlToCall="";
	this.startit = function( oneProcess) {
		var urlSt = window.location.pathname;
		if (urlSt.indexOf( 'portal/resource/app')!=-1)
		{
			// the page is display in an Application
			this.urlToCall="../../../../../../portal/resource/process/"+oneProcess.displayName+"/"+oneProcess.version+"/content/?id="+oneProcess.id+"&locale=en&autoInstantiate=false";
		}
		else
		{
			// the page is display in an profile
			this.urlToCall="../../../portal/resource/process/"+oneProcess.displayName+"/"+oneProcess.version+"/content/?id="+oneProcess.id+"&locale=en&autoInstantiate=false";
		}
	}
	
	
	this.getStartHtml = function() {
		
		return this.urlToCall;
	// urn $sce.trustAsResourceUrl("www.lemonde.fr");
	// return $sce.trustAsHtml(  "www.lemonde.fr" );
	// return "www.lemonde.fr";
	};
});



})();