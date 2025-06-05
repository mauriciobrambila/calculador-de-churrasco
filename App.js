import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Switch } from 'react-native';

export default function App() {
  //armazena os valores
  const [adultos, setAdultos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  
  // Quantidades padrão por pessoa
  const [padroes, setPadroes] = useState({
    carneAdulto: 400,       // gramas
    carneCrianca: 200,
    paoAdulto: 2,           // unidades
    paoCrianca: 1,
    saladaAdulto: 150,       // gramas
    saladaCrianca: 80,
    cervejaAdulto: 3,        // latas de 350ml
    refrigeranteAdulto: 1,   // garrafas de 600ml
    refrigeranteCrianca: 1,  // garrafas de 600ml
  });

  //controle de ajustes
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [consideraCerveja, setConsideraCerveja] = useState(true);

  //calcula as quantidades totais
  const calcularTotais = () => {
    const cervejaTotal = consideraCerveja ? adultos * padroes.cervejaAdulto : 0;
    
    return {
      carne: adultos * padroes.carneAdulto + criancas * padroes.carneCrianca,
      pao: adultos * padroes.paoAdulto + criancas * padroes.paoCrianca,
      salada: adultos * padroes.saladaAdulto + criancas * padroes.saladaCrianca,
      cerveja: cervejaTotal,
      refrigerante: adultos * padroes.refrigeranteAdulto + criancas * padroes.refrigeranteCrianca,
    };
  };

  const totais = calcularTotais();

  //ajusta os padrões
  const ajustarPadroes = (item, valor) => {
    setPadroes({
      ...padroes,
      [item]: Number(valor) || 0,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de Churrasco</Text>
      
      {/* Inputs para número de pessoas */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quantidade de Adultos:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={adultos.toString()}
          onChangeText={(text) => setAdultos(Number(text) || 0)}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quantidade de Crianças:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={criancas.toString()}
          onChangeText={(text) => setCriancas(Number(text) || 0)}
        />
      </View>

      {/* Opção para considerar cerveja */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Cerveja: Sim ou Não </Text>
        <Switch
          value={consideraCerveja}
          onValueChange={setConsideraCerveja}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={consideraCerveja ? "green" : "red"}
        />
      </View>
      
      {/* Botão para mostrar/ocultar ajustes */}
      <Text 
        style={styles.ajustesLink}
        onPress={() => setMostrarAjustes(!mostrarAjustes)}
      >
        {mostrarAjustes ? 'Ocultar ajustes' : 'Modificar item por item'}
      </Text>
      
      {/* Seção de ajustes */}
      {mostrarAjustes && (
        <View style={styles.ajustesContainer}>
          <Text style={styles.ajustesTitle}>Quantidade por Adulto:</Text>
          
          <View style={styles.ajusteItem}>
            <Text>Carne - gr (g):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.carneAdulto.toString()}
              onChangeText={(t) => ajustarPadroes('carneAdulto', t)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.ajusteItem}>
            <Text>Pães - unidades (unid.):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.paoAdulto.toString()}
              onChangeText={(t) => ajustarPadroes('paoAdulto', t)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.ajusteItem}>
            <Text>Salada - porções gr (g):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.saladaAdulto.toString()}
              onChangeText={(t) => ajustarPadroes('saladaAdulto', t)}
              keyboardType="numeric"
            />
          </View>
          
          {consideraCerveja && (
            <View style={styles.ajusteItem}>
              <Text>Cerveja - 350ml (latas):</Text>
              <TextInput
                style={styles.ajusteInput}
                value={padroes.cervejaAdulto.toString()}
                onChangeText={(t) => ajustarPadroes('cervejaAdulto', t)}
                keyboardType="numeric"
              />
            </View>
          )}
          
          <View style={styles.ajusteItem}>
            <Text>Refrigerante -600ml (garrafas):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.refrigeranteAdulto.toString()}
              onChangeText={(t) => ajustarPadroes('refrigeranteAdulto', t)}
              keyboardType="numeric"
            />
          </View>
          
          <Text style={styles.ajustesTitle}>Quantidade por Criança:</Text>
          
          <View style={styles.ajusteItem}>
            <Text>Carne - gr (g):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.carneCrianca.toString()}
              onChangeText={(t) => ajustarPadroes('carneCrianca', t)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.ajusteItem}>
            <Text>Pães - unidades (unid.):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.paoCrianca.toString()}
              onChangeText={(t) => ajustarPadroes('paoCrianca', t)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.ajusteItem}>
            <Text>Salada - porções gr (g):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.saladaCrianca.toString()}
              onChangeText={(t) => ajustarPadroes('saladaCrianca', t)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.ajusteItem}>
            <Text>Refrigerante - 600ml (garrafas):</Text>
            <TextInput
              style={styles.ajusteInput}
              value={padroes.refrigeranteCrianca.toString()}
              onChangeText={(t) => ajustarPadroes('refrigeranteCrianca', t)}
              keyboardType="numeric"
            />
          </View>
        </View>
      )}
      
      {/* Resultados */}
      <View style={styles.resultados}>
        <Text style={styles.subtitle}>Quantidades Necessárias:</Text>
        
        <View style={styles.itemResultado}>
          <Text style={styles.itemText}>Carne:</Text>
          <Text style={styles.itemValue}>{totais.carne}gr</Text>
        </View>
        
        <View style={styles.itemResultado}>
          <Text style={styles.itemText}>Pães:</Text>
          <Text style={styles.itemValue}>{totais.pao} unidades</Text>
        </View>
        
        <View style={styles.itemResultado}>
          <Text style={styles.itemText}>Salada:</Text>
          <Text style={styles.itemValue}>{totais.salada}gr</Text>
        </View>
        
        {consideraCerveja && (
          <View style={styles.itemResultado}>
            <Text style={styles.itemText}>Cerveja:</Text>
            <Text style={styles.itemValue}>{totais.cerveja} latas (350ml)</Text>
          </View>
        )}
        
        <View style={styles.itemResultado}>
          <Text style={styles.itemText}>Refrigerante:</Text>
          <Text style={styles.itemValue}>{totais.refrigerante} garrafas (600ml)</Text>
        </View>
      </View>
      
      <Text style={styles.observacao}>
        * Valores baseados em médias padrão. Podendo ser alterado clicando em "Modificar item por item".
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  inputGroup: {
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 18,
    paddingHorizontal: 25,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '40%',
    textAlign: 'center',
  },
 // Substitua o styles.switchContainer por este:
switchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: -2,  // Aumentei a margem
  padding: 1,      // Aumentei o padding
  backgroundColor: '#fff',
  borderRadius: 18,
  width: '100%',    // Adicionei largura total
},
switchLabel: {
  fontSize: 16,
  color: 'red',
  padding: 5,
  marginRight: 10,  // Adicionei margem à direita
  flexShrink: 1,    // Permite que o texto quebre linha se necessário
},
  resultados: {
    marginTop: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 13,
  },
  itemResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  itemText: {
    fontSize: 16,
    color: '#666',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  ajustesLink: {
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 16,
    padding: 10,
  },
  ajustesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  ajustesTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  ajusteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -2,
    paddingVertical: 5,
  },
  ajusteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 5,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  observacao: {
    marginTop: 20,
    fontSize: 12,
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});