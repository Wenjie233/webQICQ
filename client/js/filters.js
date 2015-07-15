angular.module('starter.filters', [])

.filter('isMe', function () {
	return function(input){
		return input[0] === input[1] ? 'item-avatar-right text-right' : 'item-avatar';
	}
})