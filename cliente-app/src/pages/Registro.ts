import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [codigoPais, setCodigoPais] = useState('+591');

  const handleRegistro = async () => {
    const nombreMayusculas = nombre.toUpperCase().trim();
    
    if (!nombreMayusculas || !telefono) {
      alert('POR FAVOR COMPLETA TODOS LOS CAMPOS');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreMayusculas,
          telefono: `${codigoPais}${telefono}`,
          tipo: tipoUsuario
        })
      });

      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('usuario', JSON.stringify(result.user));
        
        if (tipoUsuario === 'cliente') {
          navigate('/home');
        } else {
          window.location.href = 'http://localhost:5174'; // App delivery
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('ERROR DE CONEXIÓN');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#000000', fontWeight: 'bold' }}>
          REGISTRO DELIVERY TRINIDAD
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend" sx={{ color: '#000000', fontWeight: 'bold', mb: 1 }}>
            TIPO DE USUARIO
          </FormLabel>
          <RadioGroup row value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <FormControlLabel 
              value="cliente" 
              control={<Radio sx={{ color: '#000000' }} />} 
              label="CLIENTE" 
              sx={{ '& .MuiFormControlLabel-label': { color: '#000000', fontWeight: 'bold' } }}
            />
            <FormControlLabel 
              value="delivery" 
              control={<Radio sx={{ color: '#000000' }} />} 
              label="MOTERO DELIVERY" 
              sx={{ '& .MuiFormControlLabel-label': { color: '#000000', fontWeight: 'bold' } }}
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="NOMBRE Y APELLIDO"
          value={nombre}
          onChange={(e) => {
            const texto = e.target.value.toUpperCase();
            const soloLetras = texto.replace(/[^A-ZÁÉÍÓÚÑ\s]/g, '');
            setNombre(soloLetras);
          }}
          sx={{ mb: 3 }}
          InputProps={{ 
            style: { 
              color: '#000000', 
              fontWeight: 'bold',
              textTransform: 'uppercase'
            } 
          }}
          InputLabelProps={{ 
            style: { 
              color: '#000000', 
              fontWeight: 'bold' 
            } 
          }}
          placeholder="EJ: JUAN PÉREZ GÓMEZ"
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="CÓDIGO"
            value={codigoPais}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, '');
              setCodigoPais(`+${valor}`);
            }}
            sx={{ width: '120px' }}
            InputProps={{ style: { color: '#000000', fontWeight: 'bold' } }}
            InputLabelProps={{ style: { color: '#000000', fontWeight: 'bold' } }}
          />
          
          <TextField
            fullWidth
            label="NÚMERO DE CELULAR"
            value={telefono}
            onChange={(e) => {
              const soloNumeros = e.target.value.replace(/\D/g, '');
              setTelefono(soloNumeros);
            }}
            InputProps={{ style: { color: '#000000', fontWeight: 'bold' } }}
            InputLabelProps={{ style: { color: '#000000', fontWeight: 'bold' } }}
            placeholder="EJ: 71234567"
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleRegistro}
          sx={{
            py: 1.5,
            backgroundColor: '#000000',
            color: '#ffffff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            '&:hover': {
              backgroundColor: '#333333'
            }
          }}
        >
          REGISTRARSE
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: '#000000', fontWeight: 'bold' }}>
          TRINIDAD, BENI - BOLIVIA
        </Typography>
      </Box>
    </Container>
  );
};

export default Registro;