var ArrayAlunos = Array();

class Alunos{
    constructor(Nome, Nota1, Nota2, Nota3){
        this.Nome = Nome;
        this.Nota1 = Nota1;
        this.Nota2 = Nota2;
        this.Nota3 = Nota3;
    }

    get Media(){
        return (parseInt(this.Nota1)+parseInt(this.Nota2)+parseInt(this.Nota3))/3;
    }
}

function ValidaNotas(IDNota, PosicaoNota){
    if($(IDNota).val() == "" || isNaN($(IDNota).val())){
        Problemas += 1;

        if(Motivo == ""){
            Separador = "";
            Motivo +=  Separador+PosicaoNota +" nota não informada";
        }
        else{
            Separador = ", ";
            Motivo +=  Separador+PosicaoNota +" nota não informada";
            
        }
    }
    else if($(IDNota).val() < 0){
        Problemas += 1;

        if(Motivo == ""){
            Separador = "";
            Motivo += Separador+PosicaoNota+" nota menor que 0";
        }
        else{
            Separador = ", ";
            Motivo += Separador+PosicaoNota+" nota menor que 0";
        }
    }
    else if($(IDNota).val() > 10){
        Problemas += 1;

        if(Motivo == ""){
            Separador = "";
            Motivo += Separador+PosicaoNota+" nota maior que 10";
        }
        else{
            Separador = ", ";
            Motivo += Separador+PosicaoNota+" nota maior que 10";
        }
    }
}

var Motivo = "";
var Problemas = 0;
function ValidaFormulario(){
    Problemas = 0;
    Motivo = "";
    
    if($("#iNome").val() == ""){
        Problemas += 1;
        Motivo += "Nome inválido";
    }
    ValidaNotas("#iNota1", "Primeira");
    ValidaNotas("#iNota2", "Segunda");
    ValidaNotas("#iNota3", "Terceira");

    Motivo += ".";
    return Problemas;
}

function CadastraAluno(){
    let Nome = $("#iNome").val();
    let Nota1 = $("#iNota1").val();
    let Nota2 = $("#iNota2").val();
    let Nota3 = $("#iNota3").val();
    let Aluno = new Alunos(Nome, Nota1, Nota2, Nota3);
    ArrayAlunos.push(Aluno);
    $("#iNome").val("");
    $("#iNota1").val("");
    $("#iNota2").val("");
    $("#iNota3").val("");
    window.alert("Aluno cadastrado com sucesso!")
}

function CriaBotoes(){
    $("#AlunoAnterior").click(function(){
        console.log("Anterior");
        MudaAlunoLista("Anterior");
    });
    $("#ProximoAluno").click(function(){
        console.log("Proximo");
        MudaAlunoLista("Proximo");
    })
}

var AlunoAtual = 0;
function ListaAlunos(){
    $("#Lista").html("<h3>Lista de Alunos</h3>"+
    "<br>Nome: "+ArrayAlunos[AlunoAtual].Nome
    +"<br>Nota 1: "+ArrayAlunos[AlunoAtual].Nota1
    +"<br>Nota 2: "+ArrayAlunos[AlunoAtual].Nota2
    +"<br>Nota 3: "+ArrayAlunos[AlunoAtual].Nota3
    +"<br>Média: "+ArrayAlunos[AlunoAtual].Media
    +"<br><br><div class\"ContainerBotoes\"><input type=\"button\" class=\"Botao\" value=\"Aluno Anterior\" id=\"AlunoAnterior\"><input type=\"button\" class=\"Botao\" value=\"Proximo Aluno\" id=\"ProximoAluno\"></div>")
    CriaBotoes();
}

function MudaAlunoLista(Operacao){
    if(Operacao == "Proximo"){
        if(AlunoAtual < ArrayAlunos.length -1){
            AlunoAtual += 1;
            ListaAlunos();
        }
    }
    else{
        if(AlunoAtual > 0){
            AlunoAtual -= 1;
            ListaAlunos();
        }
    }
}

var QuantidadeAlunosCadastrados = ArrayAlunos.length;
var ExisteLista = false;
function CriaLista(){
    if(ArrayAlunos.length != 0){
        if(ExisteLista == false){
            $("#Corpo").append("<br><div class=\"Lista\" id=\"Lista\"></div>");
            ListaAlunos();
            ExisteLista = true;
        }
        else{
            ListaAlunos();
        }
    }
    else{
        window.alert("Não há alunos para listar")
    }
    
}



$(document).ready(function(){
    $("#BotaoEnvia").click(function(){
        if(ValidaFormulario() < 1){
            CadastraAluno()
        }
        else{
            window.alert(Problemas+" Problemas foram encontrados: "+Motivo)
        }
    });
    $("#BotaoLista").click(CriaLista);
})