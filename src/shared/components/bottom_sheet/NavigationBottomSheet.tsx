import { GhostButton } from '@shared/components/buttons/GhostButton';
import { PrimaryButton } from '@shared/components/buttons/PrimaryButton';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import type { NavigationBottomSheetProps } from './bottomSheet.type';
import { useBottomSheetNavigation } from './hooks/useBottomSheetNavigation.ts';
import { useMultiSelect } from './hooks/useMultiSelect.ts';

export const NavigationBottomSheet: React.FC<NavigationBottomSheetProps> = ({
  isOpen,
  onClose,
  steps,
  initialStep,
  onApply,
  renderStepContent,
  height = 'large',
  showApplyButton = true,
  showResetButton = true,
}) => {
  const navigation = useBottomSheetNavigation();
  const multiSelect = useMultiSelect();

  useEffect(() => {
    if (isOpen && !navigation.navigationState.currentStep) {
      const initialStepData = steps[initialStep];
      navigation.reset(initialStep, initialStepData?.title || '', initialStepData?.subtitle);
    }
  }, [isOpen, initialStep, steps, navigation]);

  const currentStep = navigation.navigationState.currentStep;
  const currentStepData = steps[currentStep];

  const helpers = {
    navigation,
    multiSelect,
    navigateTo: navigation.navigateTo,
    goBack: navigation.goBack,
    toggleSelection: multiSelect.toggleItem,
    getSelectionCount: multiSelect.getSelectionCount,
    isSelected: multiSelect.isSelected,
  };

  const handleApply = () => {
    onApply({
      selections: multiSelect.selections,
      navigationData: navigation.navigationState.data,
    });
    onClose();
  };

  const hasSelections = multiSelect.getSelectionCount() > 0;

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={navigation.currentStepTitle}
      subtitle={navigation.currentStepSubtitle}
      showBackButton={navigation.canGoBack}
      onBack={navigation.goBack}
      height={height}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStepContent(currentStep, currentStepData, helpers)}
        </motion.div>
      </AnimatePresence>

      {(showApplyButton || showResetButton) && (
        <div className="flex gap-3 mt-6">
          {showResetButton && (
            <GhostButton
              onClick={multiSelect.clearAll}
              disabled={!hasSelections}
              className="flex-1 py-3 rounded-md"
            >
              초기화
            </GhostButton>
          )}

          {showApplyButton && (
            <PrimaryButton
              onClick={handleApply}
              disabled={!hasSelections}
              className="flex-1 py-3 rounded-md"
            >
              적용하기 {hasSelections && `(${multiSelect.getSelectionCount()})`}
            </PrimaryButton>
          )}
        </div>
      )}
    </BaseBottomSheet>
  );
};
