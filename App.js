import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Switch, 
  TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

// Constantes para valores padrão e estilos
const DEFAULT_VALUES = {
  carneAdulto: 400,
  carneCrianca: 200,
  paoAdulto: 2,
  paoCrianca: 1,
  saladaAdulto: 150,
  saladaCrianca: 80,
  cervejaAdulto: 3,
  refrigeranteAdulto: 1,
  refrigeranteCrianca: 1,
};

const COLORS = {
  primary: 'red',
  secondary: '#3498db',
  danger: '#e74c3c',
  light: '#ecf0f1',
  dark: '#2c3e50',
  background: '#f9f9f9',
};

const CalculadoraChurrasco = () => {
  const [adultos, setAdultos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [padroes, setPadroes] = useState(DEFAULT_VALUES);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [consideraCerveja, setConsideraCerveja] = useState(true);

  // Função otimizada para cálculo
  const calcularTotais = () => {
    return {
      carne: adultos * padroes.carneAdulto + criancas * padroes.carneCrianca,
      pao: adultos * padroes.paoAdulto + criancas * padroes.paoCrianca,
      salada: adultos * padroes.saladaAdulto + criancas * padroes.saladaCrianca,
      cerveja: consideraCerveja ? adultos * padroes.cervejaAdulto : 0,
      refrigerante: adultos * padroes.refrigeranteAdulto + criancas * padroes.refrigeranteCrianca,
    };
  };

  const totais = calcularTotais();
  const ajustarPadroes = (item, valor) => {
    const newValue = Math.max(0, Number(valor) || 0);
    setPadroes(prev => ({ ...prev, [item]: newValue }));
  };

  const resetarPadroes = () => {
    setPadroes(DEFAULT_VALUES);
  };

  const InputField = ({ label, value, onChange, unit = '' }) => {
    const [tempValue, setTempValue] = useState(value.toString());
    const timeoutRef = React.useRef(null);
    const handleChange = (text) => {
      setTempValue(text);
      
      // Limpa o timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Configura um novo timeout
      timeoutRef.current = setTimeout(() => {
        onChange(text);
      }, 4000); // 2 segundo de delay
    };
  
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
  
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tempValue}
            onChangeText={handleChange}
            placeholder="0"
          />
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
      </View>
    );
  };

  const ResultItem = ({ label, value, unit }) => (
    <View style={styles.itemResultado}>
      <Text style={styles.itemText}>{label}</Text>
      <Text style={styles.itemValue}>
        {value} <Text style={styles.unitText}>{unit}</Text>
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}> 🍖Calculadora de Churrasco🍗</Text>
        
        {/* Seção de entrada de dados */}
        <View style={styles.card}>
          <InputField 
            label="        Quantidade de Adultos:" 
            value={adultos} 
            onChange={(text) => setAdultos(Math.max(0, Number(text) || 0))} 
          />
          
          <InputField 
            label="       Quantidade de Crianças:" 
            value={criancas} 
            onChange={(text) => setCriancas(Math.max(0, Number(text) || 0))} 
          />
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>    Incluir cerveja no cálculo?</Text>
            <Switch
              value={consideraCerveja}
              onValueChange={setConsideraCerveja}
              trackColor={{ false: COLORS.light, true: COLORS.primary }}
              thumbColor={consideraCerveja ? 'green' : 'red'}
            />
          </View>
        </View>

        {/* Botão de ajustes */}
        <TouchableOpacity 
          style={styles.ajustesButton}
          onPress={() => setMostrarAjustes(!mostrarAjustes)}
          activeOpacity={0.7}
        >
          <Text style={styles.ajustesButtonText}>
            {mostrarAjustes ? '▲ Ocultar Ajustes' : '▼ Personalizar Quantidades'}
          </Text>
        </TouchableOpacity>
        
        {/* Seção de ajustes */}
        {mostrarAjustes && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quantidades por Adulto </Text>
              {mostrarAjustes && (
                <TouchableOpacity onPress={resetarPadroes}>
                  <Text style={styles.resetButton}>Resetar</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <InputField 
              label="Carne (gramas):" 
              value={padroes.carneAdulto} 
              onChange={(t) => ajustarPadroes('carneAdulto', t)} 
              unit="g"
            />
            
            <InputField 
              label="Pães (unidades):" 
              value={padroes.paoAdulto} 
              onChange={(t) => ajustarPadroes('paoAdulto', t)} 
              unit="un"
            />
            
            <InputField 
              label="Salada (gramas):" 
              value={padroes.saladaAdulto} 
              onChange={(t) => ajustarPadroes('saladaAdulto', t)} 
              unit="g"
            />
            
            {consideraCerveja && (
              <InputField 
                label="Cerveja (latas 350ml):" 
                value={padroes.cervejaAdulto} 
                onChange={(t) => ajustarPadroes('cervejaAdulto', t)} 
                unit="latas"
              />
            )}
            
            <InputField 
              label="Refrigerante (garrafas 600ml):" 
              value={padroes.refrigeranteAdulto} 
              onChange={(t) => ajustarPadroes('refrigeranteAdulto', t)} 
              unit="garrafas"
            />
            
            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>     Quantidades por Criança</Text>
            
            <InputField 
              label="Carne (gramas):" 
              value={padroes.carneCrianca} 
              onChange={(t) => ajustarPadroes('carneCrianca', t)} 
              unit="g"
            />
            
            <InputField 
              label="Pães (unidades):" 
              value={padroes.paoCrianca} 
              onChange={(t) => ajustarPadroes('paoCrianca', t)} 
              unit="un"
            />
            
            <InputField 
              label="Salada (gramas):" 
              value={padroes.saladaCrianca} 
              onChange={(t) => ajustarPadroes('saladaCrianca', t)} 
              unit="g"
            />
            
            <InputField 
              label="Refrigerante (garrafas 600ml):" 
              value={padroes.refrigeranteCrianca} 
              onChange={(t) => ajustarPadroes('refrigeranteCrianca', t)} 
              unit="garrafas"
            />
          </View>
        )}
        
        {/* Resultados */}
        <View style={[styles.card, { marginTop: 1 }]}>
          <Text style={styles.subtitle}>    📋   Lista de Compras</Text>
          
          <ResultItem 
            label="Carne:" 
            value={totais.carne} 
            unit="gramas" 
          />
          
          <ResultItem 
            label="Pães:" 
            value={totais.pao} 
            unit="unidades" 
          />
          
          <ResultItem 
            label="Salada:" 
            value={totais.salada} 
            unit="gramas" 
          />
          
          {consideraCerveja && (
            <ResultItem 
              label="Cerveja:" 
              value={totais.cerveja} 
              unit="latas (350ml)" 
            />
          )}
          
          <ResultItem 
            label="Refrigerante:" 
            value={totais.refrigerante} 
            unit="garrafas (600ml)" 
          />
        </View>
        
        <Text style={styles.observacao}>
          * Valores calculados com base nas quantidades personalizadas.
          {!mostrarAjustes && ' Toque em "Personalizar Quantidades" para ajustar.'}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.dark,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 2.5,
    borderRadius: 20,
    paddingHorizontal: 25,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
    color: COLORS.dark,
  },
  unit: {
    fontSize: 14,
    color: '#7f8c8d',
    width: 80,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '600',
  },
  resultados: {
    marginTop: 20,
  },
  itemResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomWidth: 5,
    borderBottomColor: '#ecf0f1',
  },
  itemText: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '500',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7f8c8d',
  },
  ajustesButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  ajustesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
  },
  resetButton: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  observacao: {
    marginTop: 3,
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CalculadoraChurrasco;