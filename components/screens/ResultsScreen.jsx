import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Custom rating bar component to visualize scores
const RatingBar = ({ score, label, color = '#99f6ff' }) => {
  // Ensure score is a number (fixing the text rendering error)
  const numericScore = typeof score === 'number' ? score : 0;
  
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingLabelContainer}>
        <Text style={styles.ratingLabel}>{label}</Text>
        <Text style={styles.ratingScore}>{numericScore.toFixed(1)}</Text>
      </View>
      <View style={styles.ratingBarBackground}>
        <View 
          style={[
            styles.ratingBarFill, 
            { width: `${numericScore * 10}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

const ResultsScreen = ({ 
  results, 
  imageUrl, 
  loading, 
  error, 
  isGeneratingRoutine, 
  onGenerateRoutine, 
  onRetry, 
  onGoHome 
}) => {
  // Function to safely render scores, preventing the text rendering error
  const renderScore = (score) => {
    if (score === undefined || score === null) {
      return '0.0';
    }
    // Ensure score is treated as a number
    const numericScore = typeof score === 'number' ? score : Number(score);
    return isNaN(numericScore) ? '0.0' : numericScore.toFixed(1);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#99f6ff" />
          <Text style={styles.loadingText}>Analyzing your photo...</Text>
          <Text style={styles.subText}>This usually takes about 15-20 seconds</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Analysis Failed</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={onGoHome}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!results) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#ff6b6b" />
          <Text style={styles.errorTitle}>No Results</Text>
          <Text style={styles.errorText}>We couldn't get analysis results. Please try again with a different photo.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Results</Text>
      </View>

      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.scoreCard}>
        <View style={styles.overallScoreContainer}>
          <Text style={styles.overallScoreLabel}>Overall Score</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.overallScoreText}>
              {/* Safe text rendering to fix the error */}
              {renderScore(results.overall)}
            </Text>
          </View>
        </View>

        <Text style={styles.assessmentText}>
          {typeof results.assessment === 'string' ? results.assessment : 'Analysis complete.'}
        </Text>

        <View style={styles.detailedScores}>
          <RatingBar 
            score={results.facialSymmetry} 
            label="Facial Symmetry" 
            color="#6FEDD8" 
          />
          <RatingBar 
            score={results.skinHealth} 
            label="Skin Health" 
            color="#7D85FF" 
          />
          <RatingBar 
            score={results.style} 
            label="Style" 
            color="#BF9DF8" 
          />
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.routineButton}
          onPress={onGenerateRoutine}
          disabled={isGeneratingRoutine}
        >
          {isGeneratingRoutine ? (
            <View style={styles.routineButtonContent}>
              <ActivityIndicator size="small" color="#FFF" />
              <Text style={styles.routineButtonText}>Creating Your Routine...</Text>
            </View>
          ) : (
            <View style={styles.routineButtonContent}>
              <Ionicons name="list-outline" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.routineButtonText}>Create Personal Routine</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.newAnalysisButton} onPress={onRetry}>
          <View style={styles.newAnalysisButtonContent}>
            <Ionicons name="camera-outline" size={20} color="#99f6ff" style={styles.buttonIcon} />
            <Text style={styles.newAnalysisButtonText}>New Analysis</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Our AI analyzes multiple facial features to provide these scores.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#99f6ff',
  },
  scoreCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  overallScoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  overallScoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(153, 246, 255, 0.15)',
    borderWidth: 2,
    borderColor: '#99f6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallScoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#99f6ff',
  },
  assessmentText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  detailedScores: {
    marginTop: 10,
  },
  ratingContainer: {
    marginBottom: 15,
  },
  ratingLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#EEE',
  },
  ratingScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ratingBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  actionButtons: {
    marginBottom: 20,
  },
  routineButton: {
    backgroundColor: 'rgba(57, 90, 255, 0.7)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  routineButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  newAnalysisButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#99f6ff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  newAnalysisButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newAnalysisButtonText: {
    color: '#99f6ff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#AAA',
    fontSize: 12,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#3D5AFE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ResultsScreen;
