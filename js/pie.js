/**
 * Created by IBM on 20/05/16.
 */
var pie = new d3pie("pieChart", {
    "header": {
        "title": {
            "text": " Offences recorded by categories in melbourne",
            "fontSize": 24,
            "font": "open sans"
        },
        "subtitle": {
            "color": "#999999",
            "fontSize": 12,
            "font": "open sans"
        },
        "titleSubtitlePadding": 9
    },
    "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
    },
    "size": {
        "canvasHeight": 400,
        "canvasWidth": 800,
        "pieOuterRadius": "90%"
    },
    "data": {
        "sortOrder": "value-desc",
        "content": [
            {
                "label": "Crimes against the person",
                "value": 70261,
                "color": "#2484c1"
            },
            {
                "label": "Property and " +
                    "deception",
                "value": 285666,
                "color": "#0c6197"
            },
            {
                "label": "Drug offences",
                "value": 29740,
                "color": "#4daa4b"
            },
            {
                "label": "Public order and security",
                "value": 37054,
                "color": "#90c469"
            },
            {
                "label": "Justice procedures offences",
                "value": 58594,
                "color": "#c5d444"
            },
            {
                "label": "Other offences",
                "value": 1644,
                "color": "#670fa4"
            }
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 32
        },
        "inner": {
            "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#adadad",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 8
        }
    },
    "misc": {
        "gradient": {
            "enabled": true,
            "percentage": 100
        }
    }
});