var games = ["mope", "airmash"]

$('.hub-icon').each(function(i, obj) {
	print(obj)
    obj.css("background-image", games[i])
})