import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';

interface CustoFixo {
  descricao: string;
  valor: number;
}

const App = () => {
  const [preco, setPreco] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [descricaoCusto, setDescricaoCusto] = useState<string>('');
  const [valorCusto, setValorCusto] = useState<string>('');
  const [custosFixos, setCustosFixos] = useState<CustoFixo[]>([]);

  const handleAddCusto = () => {
    if (!descricaoCusto || !valorCusto) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const valor = parseFloat(valorCusto);
    const novoCusto: CustoFixo = { descricao: descricaoCusto, valor };
    setCustosFixos([...custosFixos, novoCusto]);
    setDescricaoCusto('');
    setValorCusto('');
  };

  const handleRemoveCusto = (index: number) => {
    const novosCustos = custosFixos.filter((_, i) => i !== index);
    setCustosFixos(novosCustos);
  };

  const handleCalcularLucro = () => {
    const precoNum = parseFloat(preco);
    const quantidadeNum = parseInt(quantidade);

    if (isNaN(precoNum) || isNaN(quantidadeNum)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    const receitaTotal = precoNum * quantidadeNum;
    const totalCustosFixos = custosFixos.reduce((total, custo) => total + custo.valor, 0);
    const lucro = receitaTotal - totalCustosFixos;

    Alert.alert(
      'Resultado',
      `Receita Total: R$ ${receitaTotal.toFixed(2)}\nCustos Fixos: R$ ${totalCustosFixos.toFixed(2)}\nLucro Líquido: R$ ${lucro.toFixed(2)}`
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, textAlign: 'center', marginBottom: 20 }}>Dena</Text>

      {/* Seção de Receita */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Receita</Text>
      <TextInput
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
        placeholder="Preço por unidade"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <TextInput
        style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
        placeholder="Quantidade vendida"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      {/* Seção de Custos Fixos */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Custos Fixos</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
          placeholder="Descrição do Custo"
          value={descricaoCusto}
          onChangeText={setDescricaoCusto}
        />
        <TextInput
          style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
          placeholder="Valor do Custo"
          keyboardType="numeric"
          value={valorCusto}
          onChangeText={setValorCusto}
        />
        <Button title="Adicionar Custo Fixo" onPress={handleAddCusto} />
      </View>

      {/* Lista de Custos Fixos */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Lista de Custos Fixos</Text>
        <FlatList
          data={custosFixos}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Text>
                {item.descricao} - R$ {item.valor.toFixed(2)}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveCusto(index)}>
                <Text style={{ color: 'red' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Botão de Calcular */}
      <Button title="Calcular Lucro" onPress={handleCalcularLucro} />
    </ScrollView>
  );
};

export default App;

