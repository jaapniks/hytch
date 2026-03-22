import SwiftUI

// MARK: - Animation State Machine

enum AnimationStep {
    case idle
    case wordsAppearing
    case cardAppearing
    case zoomingIn
    case answerScreen
    case zoomingOut
    case sending
}

// MARK: - Main Content View

struct ContentView: View {
    var body: some View {
        HytchFlowView()
    }
}

// MARK: - Main Flow View

struct HytchFlowView: View {
    @State private var animationStep: AnimationStep = .idle
    @State private var visibleWordCount = 0
    @State private var cardOffset: CGFloat = 300
    @State private var cardOpacity: Double = 0
    @State private var cardScale: CGFloat = 1.0
    @State private var cardCornerRadius: CGFloat = 28
    @State private var patternOpacity: Double = 1.0
    
    @State private var answerWordsVisible = 0
    @State private var yesBlockOffset: CGFloat = 200
    @State private var noBlockOffset: CGFloat = 200
    @State private var selectedAnswer: String? = nil
    @State private var nextButtonOpacity: Double = 0
    
    @State private var cardRotation: Double = 0
    @State private var cardFlyOffset: CGFloat = 0
    @State private var sendingLabelOpacity: Double = 0
    
    private let questionWords = ["Jane's", "question", "to", "you"]
    private let answerQuestionWords = ["Do", "you", "like", "working", "out?"]
    
    var body: some View {
        ZStack {
            // Background
            Color(hex: "#F5F7FF")
                .ignoresSafeArea()
                .opacity(animationStep == .answerScreen || animationStep == .zoomingOut || animationStep == .sending ? 0 : 1)
            
            // Full-screen blue background (only visible during answer screen)
            Color(hex: "#7A92FB")
                .ignoresSafeArea()
                .opacity(animationStep == .answerScreen || animationStep == .zoomingOut || animationStep == .sending ? 1 : 0)
            
            VStack(spacing: 0) {
                Spacer()
                
                // Screen 1: Question Intro
                if animationStep == .idle || animationStep == .wordsAppearing || animationStep == .cardAppearing || animationStep == .zoomingIn {
                    VStack(spacing: 40) {
                        // Word-by-word title
                        HStack(spacing: 8) {
                            ForEach(0..<questionWords.count, id: \.self) { index in
                                Text(questionWords[index])
                                    .font(.system(size: 28, weight: .semibold, design: .rounded))
                                    .foregroundColor(Color(hex: "#7A92FB"))
                                    .opacity(index < visibleWordCount ? 1 : 0)
                                    .offset(y: index < visibleWordCount ? 0 : 20)
                            }
                        }
                        .padding(.top, 100)
                        
                        // Card
                        CategoryCard()
                            .frame(width: 320, height: 420)
                            .opacity(cardOpacity)
                            .offset(y: cardOffset)
                            .scaleEffect(cardScale)
                            .cornerRadius(cardCornerRadius)
                            .rotationEffect(.degrees(cardRotation))
                            .offset(y: cardFlyOffset)
                    }
                }
                
                // Screen 2: Answer Screen
                if animationStep == .answerScreen || animationStep == .zoomingOut || animationStep == .sending {
                    VStack(spacing: 0) {
                        // Question text (word by word)
                        HStack(spacing: 8) {
                            ForEach(0..<answerQuestionWords.count, id: \.self) { index in
                                Text(answerQuestionWords[index])
                                    .font(.system(size: 32, weight: .bold, design: .rounded))
                                    .foregroundColor(.white)
                                    .opacity(index < answerWordsVisible ? 1 : 0)
                                    .offset(y: index < answerWordsVisible ? 0 : 20)
                            }
                        }
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)
                        .padding(.top, 120)
                        
                        Spacer()
                        
                        // Answer blocks
                        VStack(spacing: 16) {
                            AnswerBlock(
                                text: "Yes",
                                isSelected: selectedAnswer == "Yes",
                                offset: yesBlockOffset
                            ) {
                                selectAnswer("Yes")
                            }
                            
                            AnswerBlock(
                                text: "No",
                                isSelected: selectedAnswer == "No",
                                offset: noBlockOffset
                            ) {
                                selectAnswer("No")
                            }
                        }
                        .padding(.horizontal, 32)
                        
                        Spacer()
                        
                        // Next button
                        Button(action: {
                            handleNext()
                        }) {
                            Text("Next")
                                .font(.system(size: 20, weight: .semibold, design: .rounded))
                                .foregroundColor(Color(hex: "#7A92FB"))
                                .frame(maxWidth: .infinity)
                                .frame(height: 56)
                                .background(.white)
                                .cornerRadius(28)
                        }
                        .padding(.horizontal, 32)
                        .padding(.bottom, 50)
                        .opacity(nextButtonOpacity)
                        .disabled(selectedAnswer == nil)
                    }
                    .opacity(animationStep == .answerScreen ? 1 : 0)
                }
                
                Spacer()
            }
            
            // Sending label
            if animationStep == .sending {
                VStack {
                    Spacer()
                    Text("Sending your answer...")
                        .font(.system(size: 18, weight: .medium, design: .rounded))
                        .foregroundColor(.white.opacity(0.9))
                        .opacity(sendingLabelOpacity)
                        .padding(.bottom, 100)
                }
            }
        }
        .onAppear {
            startAnimationSequence()
        }
    }
    
    // MARK: - Animation Sequence
    
    private func startAnimationSequence() {
        animationStep = .wordsAppearing
        
        // Animate words appearing one by one
        for i in 0..<questionWords.count {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * 0.12) {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                    visibleWordCount = i + 1
                }
            }
        }
        
        // Show card after words settle
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
            animationStep = .cardAppearing
            withAnimation(.spring(response: 0.5, dampingFraction: 0.75)) {
                cardOpacity = 1
                cardOffset = 0
            }
        }
        
        // Zoom in card to full screen
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.1) {
            animationStep = .zoomingIn
            withAnimation(.easeInOut(duration: 0.45)) {
                cardScale = 4.0
                cardCornerRadius = 0
                patternOpacity = 0
            }
            
            // Transition to answer screen
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.45) {
                animationStep = .answerScreen
                showAnswerScreen()
            }
        }
    }
    
    private func showAnswerScreen() {
        // Animate answer question words
        for i in 0..<answerQuestionWords.count {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * 0.12) {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                    answerWordsVisible = i + 1
                }
            }
        }
        
        // Animate answer blocks
        let wordsDelay = Double(answerQuestionWords.count) * 0.12 + 0.3
        
        DispatchQueue.main.asyncAfter(deadline: .now() + wordsDelay) {
            withAnimation(.spring(response: 0.45, dampingFraction: 0.72)) {
                yesBlockOffset = 0
            }
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + wordsDelay + 0.1) {
            withAnimation(.spring(response: 0.45, dampingFraction: 0.72)) {
                noBlockOffset = 0
            }
        }
    }
    
    private func selectAnswer(_ answer: String) {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred(intensity: 0.6)
        
        withAnimation(.spring(response: 0.3, dampingFraction: 0.65)) {
            selectedAnswer = answer
            nextButtonOpacity = 1.0
        }
    }
    
    private func handleNext() {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()
        
        animationStep = .zoomingOut
        
        // Zoom out from full screen back to card
        withAnimation(.easeInOut(duration: 0.45)) {
            cardScale = 1.0
            cardCornerRadius = 28
        }
        
        // Pause, then fly card off screen
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            animationStep = .sending
            
            // Show sending label
            withAnimation(.easeInOut(duration: 0.3)) {
                sendingLabelOpacity = 1.0
            }
            
            // Fly card away
            withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
                cardFlyOffset = -UIScreen.main.bounds.height
                cardRotation = -4
            }
            
            // Fade out sending label
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.2) {
                withAnimation(.easeOut(duration: 0.4)) {
                    sendingLabelOpacity = 0
                }
            }
        }
    }
}

// MARK: - Category Card

struct CategoryCard: View {
    var body: some View {
        ZStack {
            // Blue background
            RoundedRectangle(cornerRadius: 28)
                .fill(Color(hex: "#7A92FB"))
            
            // Geometric pattern
            GeometricPattern()
                .opacity(0.15)
            
            // Category label
            VStack {
                Spacer()
                Text("Future and goals")
                    .font(.system(size: 18, weight: .bold, design: .rounded))
                    .foregroundColor(.white)
                    .padding(.bottom, 32)
            }
        }
    }
}

// MARK: - Geometric Pattern (Canvas)

struct GeometricPattern: View {
    var body: some View {
        Canvas { context, size in
            let squareCount = 8
            let maxSize = max(size.width, size.height) * 1.5
            
            for i in 0..<squareCount {
                let squareSize = maxSize * CGFloat(i + 1) / CGFloat(squareCount)
                let rect = CGRect(
                    x: -squareSize * 0.3,
                    y: size.height - squareSize * 0.7,
                    width: squareSize,
                    height: squareSize
                )
                
                let path = RoundedRectangle(cornerRadius: 16)
                    .path(in: rect)
                
                context.stroke(
                    path,
                    with: .color(.white),
                    lineWidth: 2.5
                )
            }
        }
    }
}

// MARK: - Answer Block

struct AnswerBlock: View {
    let text: String
    let isSelected: Bool
    let offset: CGFloat
    let action: () -> Void
    
    @State private var isPressed = false
    
    var body: some View {
        Button(action: {
            // Scale animation
            withAnimation(.spring(response: 0.15, dampingFraction: 0.6)) {
                isPressed = true
            }
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                withAnimation(.spring(response: 0.2, dampingFraction: 0.6)) {
                    isPressed = false
                }
                action()
            }
        }) {
            Text(text)
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .foregroundColor(Color(hex: "#7A92FB"))
                .frame(maxWidth: .infinity)
                .frame(height: 72)
                .background(
                    RoundedRectangle(cornerRadius: 36)
                        .fill(.white.opacity(isSelected ? 1.0 : 0.5))
                        .shadow(
                            color: isSelected ? .black.opacity(0.1) : .clear,
                            radius: isSelected ? 8 : 0,
                            y: isSelected ? 4 : 0
                        )
                )
        }
        .scaleEffect(isPressed ? 0.97 : 1.0)
        .offset(y: offset)
    }
}

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Preview

#Preview {
    ContentView()
}
