// # Configuración de polleitor
// Configuración del servidor y polls
'use strict';
//Desarrollado por la Oficina de Software Libre bajo licencia MIT

// **exports**   
// * secret: Pass secreto para gestión de sesiones
// * loki_db_name: Archivo para almacenar la BDD
// * polls: Lista de polls a generar
module.exports = {
    'secret': 'polleitor',
    'loki_db_name': 'polls.json',
    'polls': {
        "appointable1": [{
            "q": "Candidate $1 appointable?",
            "a": ["Yes", "No"],
            "t":"option",
            "l":"1"//"Marina Dodourova"
        }],
        "appointable2": [{
            "q": "Candidate $1 appointable?",
            "a": ["Yes", "No"],
            "t":"option",
            "l":"2"//"Sajjad Jasimuddin"
        }],
        "appointable3": [{
            "q": "Candidate $1 appointable?",
            "a": ["Yes", "No"],
            "t":"option",
            "l":"3"//"Thomas Lange"
        }],
         "appointable4": [{
            "q": "Candidate $1 appointable?",
            "a": ["Yes", "No"],
            "t":"option",
            "l":"4"//"Niall Piercy"
        }],
        "ranking1": [{
            "q": "Candidate $1: ",
            "a": [1,2,3,4],
            "t":"rank",
            "l":"1"//"Marina Dodourova"
        }],
        "ranking2": [{
            "q": "Candidate $1: ",
            "a": [1,2,3,4],
            "t":"rank",
            "l":"2"//"Sajjad Jasimuddin"
        }],
        "ranking3": [{
            "q": "Candidate $1: ",
            "a": [1,2,3,4],
            "t":"rank",
            "l":"3"//"Thomas Lange"
        }],
        "ranking4": [{
            "q": "Candidate $1: ",
            "a": [1,2,3,4],
            "t":"rank",
            "l":"4"//"Niall Piercy"
        }],
        "comments1": [{
            "q": "Comments candidate $1 ",
            "a": [],
            "t":"textarea",
            "l":"1"//"Marina Dodourova"
        }],
        "comments2": [{
            "q": "Comments candidate $1 ",
            "a": [],
            "t":"textarea",
            "l":"2"//"Sajjad Jasimuddin"
        }],
        "comments3": [{
            "q": "Comments candidate $1 ",
            "a": [],
            "t":"textarea",
            "l":"3"//"Thomas Lange"
        }],
        "comments4": [{
            "q": "Comments candidate $1 ",
            "a": [],
            "t":"textarea",
            "l":"4"//"Niall Piercy"
        }],
        "save": [{
            "q": "To change your decision/comments click arrow button to go back. If not, click 'save'. ",
            "a": ['save'],
            "s": true,
            "t":"option",
            "l":""
        }],
        
    }
};
