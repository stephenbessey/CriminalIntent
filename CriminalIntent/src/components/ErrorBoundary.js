import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CustomButton } from './CustomButton';
import { SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.errorContainer}>
            <Text style={styles.title}>Oops! Something went wrong</Text>
            <Text style={styles.message}>
              We're sorry for the inconvenience. The app encountered an unexpected error.
            </Text>
            
            {__DEV__ && this.state.error && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Information:</Text>
                <Text style={styles.debugText}>
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text style={styles.debugText}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </View>
            )}
            
            <CustomButton
              title="Try Again"
              onPress={this.handleReset}
              variant="primary"
              style={styles.button}
            />
          </View>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.LG,
  },
  errorContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.XLARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: '#F44336',
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  message: {
    fontSize: FONT_SIZES.MEDIUM,
    color: '#666666',
    textAlign: 'center',
    marginBottom: SPACING.LG,
    lineHeight: FONT_SIZES.MEDIUM * 1.5,
  },
  debugContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  debugTitle: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: '#000000',
    marginBottom: SPACING.SM,
  },
  debugText: {
    fontSize: FONT_SIZES.SMALL - 2,
    color: '#333333',
    fontFamily: 'monospace',
  },
  button: {
    minWidth: 150,
  },
});