import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Button } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import styles from '@/components/styles/SignatureStyles';

interface SignatureProps {
  onSave?: (signature: string) => void;
}

const Signature = forwardRef<{}, SignatureProps>(({ onSave }, ref) => {
  const signatureRef = useRef<SignatureCanvas | null>(null);

  useImperativeHandle(ref, () => ({
    saveSignature: () => {
      signatureRef.current?.readSignature();
    },
    clearSignature: () => {
      signatureRef.current?.clearSignature();
    },
  }));

  const handleEnd = (signature: string) => {
    if (onSave) {
      onSave(signature);
    }
  };

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={signatureRef}
        onOK={handleEnd}
        descriptionText="Firme aquí"
        webStyle={style}
        backgroundColor="white"
        penColor="black"
      />
      <Button title="Save" onPress={() => signatureRef.current?.readSignature()} />
      <Button title="Clear" onPress={() => signatureRef.current?.clearSignature()} />
    </View>
  );
});

const style = `
  .m-signature-pad--footer { display: none; margin: 0px; }
  body,html {
    width: 100%; height: 100%;
    background-color: white;
  }
`;

export default Signature;
