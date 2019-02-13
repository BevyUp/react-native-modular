import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  content: {
    backgroundColor: 'white'
  },
  componentButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  titleModule: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleComponent: {
    fontSize: 15,
  },
  column: {
    height: 150,
    margin: 0
  },
  cardHeader: {
    height: 50,
    backgroundColor: "transparent",
  },
  cardContent: {
    height: 50,
    backgroundColor: "transparent",
  },
  cardFooter: {
    backgroundColor: "transparent",
  },
  cardComponent: {
    shadowOpacity: 0, 
    margin:0, 
    padding:0,
    borderColor: 'white',
    elevation: 0,
    maxWidth: '100%',
  }
})