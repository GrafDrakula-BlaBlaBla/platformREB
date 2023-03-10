import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
// import {Document, Page, Image, StyleSheet} from '@react-pdf/renderer';
import useViewModel from '../../../hooks/useViewModel';

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 35,
//     paddingBottom: 65,
//     paddingHorizontal: 35,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//     fontFamily: 'Oswald',
//   },
//   author: {
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   subtitle: {
//     fontSize: 18,
//     margin: 12,
//     fontFamily: 'Oswald',
//   },
//   text: {
//     margin: 12,
//     fontSize: 14,
//     textAlign: 'justify',
//     fontFamily: 'Times-Roman',
//   },
//   image: {
//     marginVertical: 15,
//     marginHorizontal: 100,
//   },
//   header: {
//     fontSize: 12,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   pageNumber: {
//     position: 'absolute',
//     fontSize: 12,
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     color: 'grey',
//   },
// });

interface IPDFDocProps {
  pngItems: string[];
}

export const PdfDoc: FC<IPDFDocProps> = ({pngItems}) => {
  return (
    <div>PDF Document</div>
    // <Document>
    //   <Page style={styles.body}>
    //     {pngItems.map((el) => (
    //       <Image src={el} />
    //     ))}
    //   </Page>
    // </Document>
  );
};
