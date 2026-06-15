import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, Alert } from 'react-native';

const IMAGENS_LOCAIS = {
  'pao_de_queijo.jpg': require('./img/pao_de_queijo.jpg'),
  'brownie.jpg': require('./img/brownie.jpg'),
  'bolo_de_cenoura.jpg': require('./img/bolo_de_cenoura.jpg'),
  'torta_de_limao.jpg': require('./img/torta_de_limao.jpg'),
  'coxinha.jpg': require('./img/coxinha.jpg'),
  'pudim.jpg': require('./img/pudim.jpg')
};

const RECEITAS_INICIAIS = [
  { 
    id: "1", 
    nome: 'Pão de queijo', 
    img: 'pao_de_queijo.jpg', 
    ingredientes: {"Massa":[
 "1 xícara (chá) de óleo",
 "1 xícara (chá) de água",
 "1 xícara (chá) de leite",
 "1 pacote de polvilho azedo (500 g)",
 "1 colher (chá) de sal",
 "3 ovos",
 "1 e 1/2 xícara (chá) de queijo meia cura ralado (200 g)",
 "Meio pacote de queijo parmesão ralado"
]}, 
    utensilios: [
 "1 colher de medida",
 "1 tigela grande",
 "1 xícara de medida",
 "1 panela",
 "1 ralador de queijo",
 "1 colher grande ou espátula",
 "1 assadeira",
 "1 forno"
    ], 
    passos: {"Passos":[
 "1. Ferva o leite, a água e o óleo.",
 "2. Em uma tigela, coloque o polvilho e o sal.",
 "3. Despeje os líquidos quentes sobre o polvilho e misture.",
 "4. Acrescente os ovos e os queijos.",
 "5. Misture bem até formar uma massa.",
 "6. Modele bolinhas e coloque na assadeira.",
 "7. Asse em forno médio até dourar."
    ]}, 
    videoUrl: 'https://github.com/viniproplayer/JUK/blob/main/videos/pao-de-queijo.mp4?raw=true'
  },
  { 
    id: "2", 
    nome: 'Brownie', 
    img: 'brownie.jpg', 
    ingredientes: {"Massa":[
 "• 4 ovos (200 g)",
 "• 1 e 1/2 xícara (chá) de açúcar (275 g)",
 "• 150 g de manteiga",
 "• 2 xícaras (chá) de farinha de trigo (270 g)",
 "• 2 e 1/2 xícaras (chá) de achocolatado"
    ]}, 
    utensilios:
    [
 "• 1 colher de medida",
 "• 1 peneira (opcional)",
 "• 1 xícara de medida",
 "• 1 tigela média",
 "• 1 colher grande ou fouet para misturar",
 "• 1 panela ou recipiente para derreter a manteiga",
 "• 1 forma para assar",
 "• 1 forno",
 "1 colher de medida", 
 "1 peneira (opcional) Para ingredientes líquidos", 
 "1 xícara de medida Utensílios gerais", 
 "1 tigela média", 
 "1 colher grande ou fouet para misturar", 
 "1 panela ou recipiente para derreter a manteiga", 
 "1 forma para assar", 
 "1 forno"
      ], 
    passos:{"Passos":[
 "1. Derreta a manteiga.",
 "2. Em uma tigela, misture os ovos e o açúcar.",
 "3. Acrescente a manteiga derretida e misture bem.",
 "4. Adicione a farinha e o achocolatado aos poucos.",
 "5. Misture até formar uma massa homogênea.",
 "6. Coloque na forma untada e leve ao forno médio por cerca de 30 minutos."
    ]}, 
    videoUrl: 'https://github.com/viniproplayer/JUK/blob/main/videos/brownie.mp4?raw=true' 
  },
  { 
    id: "3", 
    nome: ' Bolo de Cenoura com Cobertura de Chocolate', 
    img: 'bolo_de_cenoura.jpg', 
    ingredientes: 
 {"Massa":[
 "• 3 cenouras médias",
 "• 4 ovos",
 "• 1/2 xícara de óleo",
 "• 2 e 1/2 xícaras de farinha de trigo",
 "• 2 xícaras de açúcar",
 "• 1 colher de fermento em pó"
],
"Cobertura":[
 "• 1 lata de leite condensado",
 "• 1 colher de manteiga",
 "• 1/2 xícara de chocolate em pó",
 "• 1/2 xícara de granulado"
 ]
 }, 
    utensilios: 
    [
 "• 1 colher de medida",
 "• 1 peneira",
 "• 1 xícara de medida",
 "• 1 liquidificador",
 "• 1 tigela",
 "• 1 forma de bolo",
 "• 1 panela para a cobertura",
 "• 1 colher ou espátula",
 "• 1 forno"
 ], 
    passos: 
    {"Modo de preparo":[
 "1. Bata no liquidificador as cenouras, os ovos e o óleo.",
 "2. Em uma tigela misture o açúcar e a farinha.",
 "3. Adicione a mistura do liquidificador.",
 "4. Acrescente o fermento e misture.",
 "5. Coloque em uma forma e asse em forno médio por cerca de 40 minutos."
    ],
"Cobertura":[
 "1. Em uma panela coloque o leite condensado, a manteiga e o chocolate em pó.",
 "2. Mexa até engrossar.",
 "3. Despeje sobre o bolo e finalize com granulado."
]}, 
    videoUrl: 'https://github.com/viniproplayer/JUK/blob/main/videos/cenoura.mp4?raw=true' 
  },
  { 
    id: "4", 
    nome: ' Torta de Limão', 
    img: 'torta_de_limao.jpg', 
    ingredientes:
{"Massa":[
 "• 2 xícaras de farinha de trigo",
 "• 4 colheres de manteiga",
 "• Meio creme de leite",
 "• 1 colher de fermento"
],
"Recheio":[
 "• 1 lata de leite condensado",
 "• 6 colheres de suco de limão",
 "• Meio creme de leite",
 "• 1 colher de raspas de limão"
 ]
 }, 
    utensilios:
    [
 "• 1 colher de medida",
 "• 1 tigela",
 "• 1 xícara de medida",
 "• 1 forma de torta",
 "• 1 espremedor de limão",
 "• 1 ralador",
 "• 1 colher ou espátula",
 "• 1 forno",
 "• 1 geladeira"   
 ], 
    passos: {"Passos":[
 "1. Misture todos os ingredientes da massa até formar uma massa homogênea.",
 "2. Forre a forma com a massa.",
 "3. Leve ao forno por cerca de 20 minutos.",
 "4. Misture os ingredientes do recheio.",
 "5. Coloque sobre a massa já fria.",
 "6. Leve à geladeira até firmar."
 ]}, 
    videoUrl: 'https://github.com/viniproplayer/JUK/blob/main/videos/torta-de-limao.mp4?raw=true' 
  }
];

export default function HomeScreen({ navigation }) {
const [receitas, setReceitas] = useState(RECEITAS_INICIAIS);
const [carregando, setCarregando] = useState(false);

const sincronizarReceitas = async () => {
setCarregando(true);
try {
const response = await fetch('https://raw.githubusercontent.com/viniproplayer/JUK/refs/heads/main/receitas.json?raw=true');
const receitasDoServidor = await response.json();
const novas = receitasDoServidor.filter(resServidor => !receitas.some(resLocal => resLocal.id === resServidor.id));

if (novas.length === 0) {
alert("Você já possui todas as receitas disponíveis!");
} else {
setReceitas(prev => [...prev, ...novas]);
alert("Novas receitas adicionadas com sucesso!");
}
} catch (error) {
alert("Erro ao conectar ao servidor.");
} finally {
setCarregando(false);
}
};

const deletarReceita = (id) => {
const confirmar = Platform.OS === 'web' ? window.confirm("Deseja remover?") : true;
if (confirmar) {
setReceitas(prev => prev.filter(r => r.id !== id));
}
};

return (
<SafeAreaView style={styles.safeArea}>
<ScrollView
style={styles.scrollView}
contentContainerStyle={styles.scrollContent}
showsVerticalScrollIndicator={true}
>
<Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>

<TouchableOpacity style={styles.btnSync} onPress={sincronizarReceitas} disabled={carregando}>
{carregando ? <ActivityIndicator color="#008000" /> : <Text style={styles.btnText}>Baixar Novidades ☁️</Text>}
</TouchableOpacity>

<View style={styles.vitrine}>
{receitas.map((receita) => (
<View key={receita.id} style={styles.cardContainer}>
<TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}>
<Image source={IMAGENS_LOCAIS[receita.img] || { uri: receita.imgUrl }} style={styles.image} />
<View style={styles.cardOverlay}>
<Text style={styles.recipeTitle}>{receita.nome}</Text>
</View>
</TouchableOpacity>
{!["1", "2", "3", "4"].includes(receita.id) && (
<TouchableOpacity style={styles.deleteBtn} onPress={() => deletarReceita(receita.id)}>
<Text style={styles.deleteText}>✕</Text>
</TouchableOpacity>
)}
</View>
))}
</View>
</ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: '#fff',
// No Web, removemos a altura fixa do SafeArea e deixamos o corpo da página crescer
height: Platform.OS === 'web' ? 'auto' : '100%',
minHeight: Platform.OS === 'web' ? '100vh' : '100%',
},
scrollView: {
flex: 1,
// Força o navegador a mostrar a barra de rolagem se o conteúdo transbordar
overflow: Platform.OS === 'web' ? 'visible' : 'scroll',
},
scrollContent: {
flexGrow: 1,
paddingBottom: 100,
// Garante que o conteúdo não fique preso
alignItems: 'stretch',
},
headerTitle: { fontSize: 26, fontWeight: 'bold', padding: 20 },
btnSync: { backgroundColor: '#008000', margin: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
btnText: { color: '#fff', fontWeight: 'bold' },
vitrine: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-around',
padding: 10
},
cardContainer: { width: '46%', marginBottom: 20, position: 'relative' },
card: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', backgroundColor: '#008000' },
image: { width: '100%', height: '100%', resizeMode: 'cover' },
cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#008000aa', padding: 8 },
recipeTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
deleteBtn: { position: 'absolute', top: -10, right: -10, backgroundColor: '#008000', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', zIndex: 99 },
deleteText: { color: '#0000000', fontWeight: 'bold' }
});
