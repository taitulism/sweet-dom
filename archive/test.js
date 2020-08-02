/* eslint-disable */

var expect = chai.expect;
var body = document.body;

describe('DomLib', function() {
/*	describe('$id', function() {
		before(function() {
			$('<div id="myId"></div>').appendTo(body);
		});

		it('should get one element by id', function() {
			expect($('#myId')[0])
				.to.equal(dom.$id('myId'));
		});

		after(function () {
			$('#myId').remove();
		});
	});*/

	describe('$cls', function() {
		before(function() {
			var container = $('<div id="container" class="myClass"></div>');

			$('<span class="myClass"></span>').appendTo(container);
			$('<span class="myClass"></span>').appendTo(container);
			$('<div class="myClass"></div>').appendTo(container);

			container.appendTo(body);
		});

		it('should get all elements by class-name', function() {

			var elms = dom.$cls('myClass');

			expect($('.myClass').length)
				.to.equal(elms.length);
		});

		it('should get all elements by class-name from a certain container', function() {

			var elms = dom.$cls('myClass', dom.$id('container'));

			expect($('.myClass', '#container').length)
				.to.equal(elms.length);
		});

		it('should get all elements by class-name and by tag-name', function() {

			var elms = dom.$cls('myClass', 'span');

			expect($('span.myClass').length)
				.to.equal(elms.length);
		});

		it('should get all elements by class-name and by tag-name from a certain container', function() {

			var elms = dom.$cls('myClass', dom.$id('container'), 'span');

			expect($('span.myClass').length)
				.to.equal(elms.length);
		});

		after(function () {
			$('#container').remove();
		});
	});

	describe('$tag', function() {
		before(function() {
			var container = $('<div id="container"></div>')

			$('<div></div>').appendTo(container);
			$('<div></div>').appendTo(container);

			container.appendTo(body);
		});

		it('should get all elements by tag-name', function() {
			expect(dom.$tag('div').length)
				.to.equal($('div').length);
		});

		it('should get all elements by tag-name from a certain container', function() {
			expect(dom.$tag('div', dom.$id('container')).length)
				.to.equal($('div', '#container').length);
		});

		after(function () {
			$('#container').remove();
		});
	});

	describe('ready', function() {
		it('should be ready when put before <body>', function () {
			expect(window.domIsReady1)
				.to.equal($('#mocha')[0]);
		});

		it('should be ready when used when put at the end of <body>', function () {
			expect(window.domIsReady2)
				.to.equal($('#mocha')[0]);
		});

		it('should NOT be ready before body when not used', function () {
			expect(window.domIsNotReady)
				.to.equal(null);
		});
	});

	describe('create', function() {
		it('should create a div when given no arguments', function () {
			expect(dom.create().nodeName).to.equal('DIV');
		});

		it('should create a simple tag', function () {
			expect(dom.create('p').nodeName).to.equal('P');
		});

		it('should create a tag with an id', function () {
			expect(dom.create('div#myId').getAttribute('id')).to.equal('myId');
		});

		it('should create a tag with a class', function () {
			expect(dom.create('div.myClass').getAttribute('class')).to.equal('myClass');
		});

		it('should create a tag with an id and a class', function () {
			var elm = dom.create('div#myId.myClass');

			expect(elm.getAttribute('id')).to.equal('myId');
			expect(elm.getAttribute('class')).to.equal('myClass');
		});

		it('should create a tag with an id and more the one class', function () {
			var elm1 = dom.create('div#myId.myClass1.myClass2');
			var elm2 = dom.create('div.myClass1.myClass2#myId');

			expect(elm1.getAttribute('id')).to.equal('myId');
			expect(elm1.getAttribute('class')).to.equal('myClass1 myClass2');
			expect(elm2.getAttribute('id')).to.equal('myId');
			expect(elm2.getAttribute('class')).to.equal('myClass1 myClass2');
		});
	});

/*	describe('remove', function() {
		before(function () {
			$('<div id="removeMe"></div>').appendTo(body);
		});

		it('should remove an element from the DOM', function () {
			var elm = dom.$id('removeMe');

			dom.remove(elm);

			expect(dom.$id('removeMe')).to.equal(null);
		});

		after(function () {
			$('#removeMe').remove();
		});
	});*/

	describe('attr', function () {
		var elm;

		before(function () {
			elm = $('<div></div>');
		});

		it('should set an attribute', function () {
			dom.attr(elm[0], 'key1', 'value1');

			expect(elm.attr('key1')).to.equal('value1');
		});

		it('should set multiple attributes', function () {
			dom.attr(elm[0], {
				'key2': 'value2',
				'key3': 'value3'
			});

			expect(elm.attr('key2')).to.equal('value2');
			expect(elm.attr('key3')).to.equal('value3');

		});

		it('should get an attribute value', function () {
			var value = dom.attr(elm[0], 'key1');

			expect(elm.attr('key1')).to.equal(value);
		});

		it('should remove attribute', function () {
			dom.attr(elm[0], 'key1', null);

			expect(elm[0].getAttribute('key1')).to.equal(null);
		});
	});

	describe('data', function () {
		var elm;

		before(function () {
			elm = $('<div></div>');
		});

		it('should set a data attribute', function () {
			dom.data(elm[0], 'key1', 'value1');

			expect(elm.data('key1')).to.equal('value1');
		});

		it('should set multiple data attributes', function () {
			dom.data(elm[0], {
				'key2': 'value2',
				'key3': 'value3'
			});

			expect(elm.data('key2')).to.equal('value2');
			expect(elm.data('key3')).to.equal('value3');

		});

		it('should get a data attribute value', function () {
			var value = dom.data(elm[0], 'key1');

			expect(elm.data('key1')).to.equal(value);
		});

		it('should remove a data attribute', function () {
			dom.attr(elm[0], 'key1', null);

			expect(elm[0].getAttribute('key1')).to.equal(null);
		});
	});

	describe('text', function () {
		var elm;

		before(function () {
			elm = $('<div></div>');
		});

		it('should set text in an element', function () {
			dom.text(elm[0], 'bla bla');

			expect(elm.text()).to.equal('bla bla');
		});

		it('should get text from an element', function () {
			var txt = dom.text(elm[0]);

			expect(txt).to.equal('bla bla');
		});
	});

	describe('html', function () {
		var elm;

		before(function () {
			elm = $('<div></div>');
		});

		it('should set text in an element', function () {
			dom.html(elm[0], '<span>bla bla</span>');

			expect(elm.html()).to.equal('<span>bla bla</span>');
		});

		it('should get text from an element', function () {
			var html = dom.html(elm[0]);

			expect(html).to.equal('<span>bla bla</span>');
		});
	});

	describe('value', function () {
		var input;

		before(function () {
			input = $('<input type="text" />');
		});

		it('should set text in an element', function () {
			dom.value(input[0], 'my name');

			expect(input.val()).to.equal('my name');
		});

		it('should get text from an element', function () {
			var value = dom.value(input[0]);

			expect(value).to.equal('my name');
		});
	});

	describe('next', function () {
		var elm;

		before(function () {
			elm = $('<div><p id="p1">1</p>a<p id="p2">2</p>b<p id="p3">3</p>c<p id="p4">4</p>d</div>');
		});

		it('should return next element', function () {
			var first = elm.find('#p1')[0];
			var next  = dom.next(first, false, false);

			expect(next.textContent).to.equal('2');
		});

		it('should return next node', function () {
			var first = elm.find('#p1')[0];
			var next  = dom.next(first, true, false);

			expect(next.textContent).to.equal('a');
		});

		it('should always return the last element sibling', function () {
			var last = elm.find('#p4')[0];
			var next = dom.next(last, false, true);

			expect(next.textContent).to.equal('4');
		});

		it('should always return the last node sibling', function () {
			var last = elm.find('#p4')[0];
			var next  = dom.next(last, true, true);

			expect(next.textContent).to.equal('d');
		});

		it('should return null when no next sibling', function () {
			var last = elm.find('#p4')[0];
			var next = dom.next(last, false, false);

			expect(next).to.equal(null);
		});
	});

	describe('next_', function () {
		var elm;

		before(function () {
			elm = $('<div><p id="p1">1</p>a<p id="p2">2</p>b<p id="p3">3</p>c<p id="p4">4</p>d</div>');
		});

		it('should return the next Nth element', function () {
			var first = elm.find('#p1')[0];
			var third = dom.next_(first, 3, false, false);

			expect(third.textContent).to.equal('4');
		});

		it('should return the next Nth node', function () {
			var first = elm.find('#p1')[0];
			var third = dom.next_(first, 3, true, false);

			expect(third.textContent).to.equal('b');
		});

		it('should return the last element', function () {
			var first = elm.find('#p1')[0];
			var third = dom.next_(first, 30, false, true);

			expect(third.textContent).to.equal('4');
		});

		it('should return the last node', function () {
			var first = elm.find('#p1')[0];
			var third = dom.next_(first, 30, true, true);

			expect(third.textContent).to.equal('d');
		});
	});

	describe('prev', function () {
		var elm;

		before(function () {
			elm = $('<div>0<p id="p1">1</p>a<p id="p2">2</p>b<p id="p3">3</p>c<p id="p4">4</p>d</div>');
		});

		it('should return previous element', function () {
			var last = elm.find('#p4')[0];
			var prev = dom.prev(last, false, false);

			expect(prev.textContent).to.equal('3');
		});

		it('should return previous node', function () {
			var last = elm.find('#p4')[0];
			var prev  = dom.prev(last, true, false);

			expect(prev.textContent).to.equal('c');
		});

		it('should always return the first element sibling', function () {
			var first = elm.find('#p1')[0];
			var prev  = dom.prev(first, false, true);

			expect(prev.textContent).to.equal('1');
		});

		it('should always return the first node sibling', function () {
			var first = elm.find('#p1')[0];
			var prev  = dom.prev(first, true, true);

			expect(prev.textContent).to.equal('0');
		});

		it('should return null when no previous sibling', function () {
			var first = elm.find('#p1')[0];
			var prev = dom.prev(first, false, false);

			expect(prev).to.equal(null);
		});
	});

	describe('prev_', function () {
		var elm;

		before(function () {
			elm = $('<div>0<p id="p1">1</p>a<p id="p2">2</p>b<p id="p3">3</p>c<p id="p4">4</p>d</div>');
		});

		it('should return the previous Nth element', function () {
			var last = elm.find('#p4')[0];
			var prev = dom.prev_(last, 3, false, false);

			expect(prev.textContent).to.equal('1');
		});

		it('should return the previous Nth node', function () {
			var last = elm.find('#p4')[0];
			var prev = dom.prev_(last, 3, true, false);

			expect(prev.textContent).to.equal('b');
		});

		it('should return the first element', function () {
			var last = elm.find('#p4')[0];
			var prev = dom.prev_(last, 30, false, true);

			expect(prev.textContent).to.equal('1');
		});

		it('should return the first node', function () {
			var last = elm.find('#p4')[0];
			var prev = dom.prev_(last, 30, true, true);

			expect(prev.textContent).to.equal('0');
		});
	});

	describe('parent', function () {
		var elm;

		before(function () {
			elm = $('<div id="grand_parent"><div id="parent"><div id="child"><div id="grand_child"></div></div></div></div>')
		});

		it('should return an element\'s parent', function () {
			var child  = elm.find('#child');
			var parent = dom.parent(child[0]);

			expect(parent.getAttribute('id')).to.equal('parent');
		});

		it('should return the Nth parent of an element', function () {
			var grandChild  = elm.find('#grand_child');
			var grandParent = dom.parent(grandChild[0], 3);

			expect(grandParent.getAttribute('id')).to.equal('grand_parent');
		});
	});

	describe('children', function () {
		var elm;

		before(function () {
			elm = $('<div>a<span>1</span>b<span>2</span>c<span>3</span>d</div>');
		});

		it('should return an array of elements', function () {
			var children = dom.children(elm[0], false);

			expect(children.length).to.equal(3);
		});

		it('should return an array of nodes', function () {
			var children = dom.children(elm[0], true);

			expect(children.length).to.equal(7);
		});
	});

	describe('child', function () {

	});

	describe('siblings', function () {
		var chosen;

		before(function () {
			var elm = $('<div><span></span><span id="chosen"></span><span></span></div>');
			chosen = elm.find('#chosen')[0];
		});

		it('should return an array of elements', function () {
			var siblings = dom.siblings(chosen, false);

			expect(siblings.length).to.equal(2);
			expect(siblings[0].getAttribute('id')).to.equal(null);
			expect(siblings[1].getAttribute('id')).to.equal(null);
		});

		it('should return an array of nodes', function () {
			var siblings = dom.siblings(chosen, true);

			expect(siblings.length).to.equal(2);
			expect(siblings[0].getAttribute('id')).to.equal(null);
			expect(siblings[1].getAttribute('id')).to.equal(null);
		});
	});

	describe('index', function () {
		var chosen;

		before(function () {
			var elm = $('<div>0<span>1</span>2<span id="chosen">3</span>4<span>5</span>6</div>');
			chosen = elm.find('#chosen')[0];
		});

		it('should return the index of an element', function () {
			var index = dom.index(chosen, false);

			expect(index).to.equal(1);
		});

		it('should return the index of a node', function () {
			var index = dom.index(chosen, true);

			expect(index).to.equal(3);
		});
	});

	describe('findRelative', function () {
		var elm;

		before(function () {
			elm = $('<div id="container"></div>');

			var grandpa = $('<div id="grandpa"></div>');
			var parent1 = $('<div id="parent1"><div class="child"></div><div class="child"></div><div class="child"></div></div>');
			var parent2 = $('<div id="parent2"><div class="child"></div><div class="child"></div><div class="child"></div></div>');

			parent1.appendTo(grandpa);
			parent2.appendTo(grandpa);
			grandpa.appendTo(elm);
		});

		it('should provide a "next" method', function () {
			var children = elm.find('.child');
			var child4   = children[3];
			var child5   = children[4];
			var child6   = children[5];

			var next  = dom.findRelative(child4, 'n');
			var next0 = dom.findRelative(child4, 'n0');
			var next1 = dom.findRelative(child4, 'n1');
			var next2 = dom.findRelative(child4, 'n2');

			expect(next).to.equal(child5);
			expect(next0).to.equal(child5);
			expect(next1).to.equal(child5);
			expect(next2).to.equal(child6);
		});

		it('should provide a "prev" method', function () {
			var children = elm.find('.child');
			var child4   = children[3];
			var child5   = children[4];
			var child6   = children[5];

			var prev  = dom.findRelative(child6, 'p');
			var prev0 = dom.findRelative(child6, 'p0');
			var prev1 = dom.findRelative(child6, 'p1');
			var prev2 = dom.findRelative(child6, 'p2');

			expect(prev).to.equal(child5);
			expect(prev0).to.equal(child5);
			expect(prev1).to.equal(child5);
			expect(prev2).to.equal(child4);
		});

		it('should provide a "parent" method', function () {
			var child4    = elm.find('.child')[3];
			var grandpa   = elm.find('#grandpa')[0];
			var theParent = elm.find('#parent2')[0];

			var parent  = dom.findRelative(child4, 'P');
			var parent0 = dom.findRelative(child4, 'P0');
			var parent1 = dom.findRelative(child4, 'P1');
			var parent2 = dom.findRelative(child4, 'P2');

			expect(parent).to.equal(theParent);
			expect(parent0).to.equal(theParent);
			expect(parent1).to.equal(theParent);
			expect(parent2).to.equal(grandpa);
		});

		it('should provide a "child" method', function () {
			var grandpa    = elm.find('#grandpa')[0];
			var theParent1 = elm.find('#parent1')[0];
			var theParent2 = elm.find('#parent2')[0];
			var child4     = elm.find('.child')[3];

			var parent  = dom.findRelative(grandpa, 'c');
			var parent0 = dom.findRelative(grandpa, 'c0');
			var parent1 = dom.findRelative(grandpa, 'c1');
			var child   = dom.findRelative(grandpa, 'c1, c0');

			expect(parent).to.equal(theParent1);
			expect(parent0).to.equal(theParent1);
			expect(parent1).to.equal(theParent2);
			expect(child).to.equal(child4);
		});

		it('should provide a mix of the above methods', function () {
			var theContainer = elm[0];
			var child6    = elm.find('.child')[5];

			var child     = dom.findRelative(theContainer, 'c, c0 n , c2');
			var container = dom.findRelative(child6, 'p p1, P, p0 c2   P2 P');

			expect(child).to.equal(child6);
			expect(container).to.equal(theContainer);
		});
	});

	describe('put', function () {
		var $container, container, $ref, ref, $target, target;

		beforeEach(function () {
			$container = $('<div id="container">sababa<div id="ref"></div>laalla</div>');
			$ref       = $container.find('#ref');
			$target    = $('<div id="target"></div>');

			container  = $container[0];
			ref        = $ref[0];
			target     = $target[0];
		});

		it('should provide a "before" method', function () {
			dom.put(target).before(ref);

			expect($target.index()).to.equal(0);
		});

		it('should provide an "after" method', function () {
			dom.put(target).after(ref);

			expect($target.index()).to.equal(1);
		});

		it('should provide an "inside" method', function () {
			dom.put(target).inside(container);

			expect($target.parent()[0]).to.equal(container);
			expect($target.index()).to.equal(1);

			dom.put(target).inside(container, 0);

			expect($target.parent()[0]).to.equal(container);
			expect($target.index()).to.equal(0);

			dom.put(target).inside(container, -1);

			expect($target.parent()[0]).to.equal(container);
			expect($target.index()).to.equal(1);

		});

		it('should provide an "instead" method', function () {
			dom.put(target).instead(ref);

			expect($container.children().length).to.equal(1);
		});

		it('should provide an "away" method', function () {
			dom.put(ref).away();

			expect($container.children().length).to.equal(0);
		});
	});

});

describe('', function () {
	var elm;

	before(function () {
		elm = $('');
	});

	it('should', function () {

	});
});
