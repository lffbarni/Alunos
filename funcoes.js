var ArrayAlunos = Array();

class Alunos{
    constructor(Nome, Nota1, Nota2, Nota3){
        this.Nome = Nome;
        this.Nota1 = Nota1;
        this.Nota2 = Nota2;
        this.Nota3 = Nota3;
    }

    get Media(){
        return (this.Nota1+this.Nota2+this.Nota3)/3;
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

$(document).ready(function(){
    $("#BotaoEnvia").click(function(){
        if(ValidaFormulario() < 1){
            CadastraAluno()
        }
        else{
            window.alert(Problemas+" Problemas foram encontrados: "+Motivo)
        }
    });
})