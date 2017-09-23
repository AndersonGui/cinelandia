function CinelandiaViewModel() {
    var self = this;
    
    self.Filmes = "";

    self.Filme = ko.observable(new function(){
        var model = this;
        
        model.Nome = ko.observable("It: A Coisa");
        model.Ano = ko.observable(2017);
        model.Categoria = ko.observable("Terror");
        model.Diretor = ko.observable("Andy Muschietti");
        model.Sinopse = ko.observable("Quando as crianças começam a desaparecer na cidade de Derry, no Maine, as crianças do bairro se unem para atacar Pennywise, um palhaço malvado, cuja história de assassinato e violência remonta há séculos.");
        model.Atores = ko.observableArray(["Bil Skarsgard", "Finn Wolfhard", "Sophia lillis"]);
        model.Img = ko.observable(null);
        model.Cartaz = ko.computed(x => {
                return model.Img() != null ? "/imgs/cartaz/"+model.Img()+".jpg" : "";
        }, this);
    });
    
    
    $.getJSON("filmes.js", function(json) {
        self.Filmes = json;
        self.MontarGrid();
    });
    
    self.MontarGrid = function ()  {
        $("#jsGrid").jsGrid({
            width: "100%",

     
            inserting: false,
            editing: false,
            sorting: true,
            paging: false,
     
            data: self.Filmes,
     
            fields: [
                { name: "Nome", align:"center", type: "text", width: 50},
                { name: "Ano", align:"center", type: "text", width: 50 },
                { name: "Categoria", align:"center", type: "text", width: 50 },
                { name: "Diretor", align:"center", type: "text", width: 50 },
                { type: "control", width: 30,
                    itemTemplate: function(value, item) {                   
                        var $customButton = $("<i class='fa fa-info-circle fa-2x' aria-hidden='true'></i>")
                            .click(function(e) {
                                self.VisualizarModal(item);
                                e.stopPropagation();
                            });                        
                        return $customButton;
                    }
                }
            ]
        });
    }
    
    self.VisualizarModal = function(filme) {
        self.Filme().Nome(filme.Nome);
        self.Filme().Ano(filme.Ano);
        self.Filme().Categoria(filme.Categoria);
        self.Filme().Diretor(filme.Diretor);
        self.Filme().Sinopse(filme.Sinopse);
        self.Filme().Atores(filme.Atores);
        self.Filme().Img(filme.Cartaz);
        
        $('#ModalFilme').modal('show'); 
    }
    
}

ko.applyBindings(new CinelandiaViewModel());