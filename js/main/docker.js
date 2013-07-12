$(window).load(function(){
$(function () {
    bindNewPanel($('#FloatingPanel_1'))
});
function bindNewPanel(p) {
    $(p).draggable({
        containment: 'parent'
    });
    $(p).bind("dragstart", function (e, ui) {
    if ($(this).hasClass('floatpanel')) {
        $(this).addClass('draggingpanel');
    }
    });
    $(p).bind("drag", function (e, ui) {
        if ($(this).hasClass('floatpanel')) {
            if (!touchingBoundary(this)) {
                $('#_umsg').text('');
                unsnapAll(this, $('.dockZone'));
            }
        }
        else if ($(this).hasClass('docked')) {
            undoc(this, e, ui);
        }
    });
    $(p).bind("dragstop", function (e) {
        $(this).removeClass('draggingpanel');
    });
}
function touchingBoundary(p) {
    var bTouching = true;
    if (touchingNorth(p)) {
        $('#_umsg').text('Snapping North!');
        snapNorth(p, $('#_dockZoneNorth'));
    }
    else if (touchingWest(p)) {
        $('#_umsg').text('Snapping West!');
        snapWest(p, $('#_dockZoneWest'));
    }
    else if (touchingEast(p)) {
        $('#_umsg').text('Snapping East!');
        snapEast(p, $('#_dockZoneEast'));
    }
    else if (touchingSouth(p)) {
        $('#_umsg').text('Snapping South!');
        snapSouth(p, $('#_dockZoneSouth'));
    }
    else {
        bTouching = false;
    }
    return (bTouching);
}
function touchingNorth(elem) {
    return (elem.offsetTop <= 1);
}
function touchingWest(elem) {
    return (elem.offsetLeft <= 1);
}
function touchingEast(elem) {
    var rm = $(elem).parent().width() - (elem.offsetLeft + $(elem).outerWidth());
    return (rm <= 1);
}
function touchingSouth(elem) {
    var bm = $(elem).parent().height() - (elem.offsetTop + $(elem).outerHeight());
    return (bm <= 1);
}
    
    
function snapNorth(elem, zone) {
    $(elem).addClass('dockableDraggable');
    $(zone).addClass('dockZoneHighlight');
}
function snapWest(elem, zone) {
    $(elem).addClass('dockableDraggable');
    $(zone).addClass('dockZoneHighlight');
}
function snapEast(elem, zone) {
    $(elem).addClass('dockableDraggable');
    $(zone).addClass('dockZoneHighlight');
}
function snapSouth(elem, zone) {
    $(elem).addClass('dockableDraggable');
    $(zone).addClass('dockZoneHighlight');
}
function unsnapAll(elem, zones) {
    $(elem).removeClass('dockableDraggable');
    $(zones).removeClass('dockZoneHighlight');
}

function undoc(p, e, ui) {
    $(p).removeClass('docked dockNorth dockEast dockWest dockSouth');
    $(p).addClass('floatpanel draggingpanel');
    $(p).css('height', 100);
    $(p).css('width', 100);
    $(p).resizable();
    ui.position.left = e.pageX;
    ui.position.top = e.pageY;
    ui.originalPosition.left = e.pageX;
    ui.originalPosition.top = e.pageY;
    ui.offset.top = 0;
    ui.offset.left = 0;
    $(p).css('top', e.pageY + 2);
    $(p).css('left', e.pageX + 2);
    return (true);
}
    
    
    
$(function () {
    $('.dockZone').droppable({
        tolerance: 'pointer',
        drop: function (event, ui) {
            dockDraggable(this, ui.draggable);
        }
    });
});
function dockDraggable(dockzone, draggable) {
$(draggable).resizable('destroy');
$(draggable).addClass('docked');
if (dockzone.id.indexOf("North") != -1) {
    dockNorth(dockzone, draggable);
}
else if (dockzone.id.indexOf("West") != -1) {
    dockWest(dockzone, draggable);
}
else if (dockzone.id.indexOf("East") != -1) {
    dockEast(dockzone, draggable);
}
else if (dockzone.id.indexOf("South") != -1) {
    dockSouth(dockzone, draggable);
}
$(draggable).removeClass('floatpanel dockableDraggable');
$('.dockZoneHighlight').removeClass('dockZoneHighlight');
//$(draggable).css('position', 'absolute');

}
function dockNorth(elem, draggable) {
$(draggable).addClass('dockNorth');
$(draggable).removeAttr('style');
$(".dockNorth").resizable({
    handles: 's'
});
}
function dockEast(elem, draggable) {
$(draggable).addClass('dockEast');
$(draggable).removeAttr('style');
$(".dockEast").resizable({
    handles: 'w'
});
}
function dockWest(elem, draggable) {
$(draggable).addClass('dockWest');
$(draggable).removeAttr('style');
$(".dockWest").resizable({
    handles: 'e'
});
}
function dockSouth(elem, draggable) {
$(draggable).addClass('dockSouth');
$(draggable).removeAttr('style');
$(".dockSouth").resizable({
    handles: 'n'
});
}

});//]]>  