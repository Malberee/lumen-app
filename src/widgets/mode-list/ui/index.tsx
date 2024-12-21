import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { cssInterop } from 'nativewind'
import { type FC } from 'react'
import type { SharedValue } from 'react-native-reanimated'

import type { ModeType } from '@entities/mode'

import { List } from './list'

interface ModeListProps {
  modes: ModeType[]
  shouldAnimateLedRing: SharedValue<boolean>
}

const StyledBottomSheet = cssInterop(BottomSheet, {
  className: 'style',
  backgroundClassname: 'backgroundStyle',
  handleClassname: 'handleStyle',
  handleIndicatorClassname: 'handleIndicatorStyle',
})

export const ModeList: FC<ModeListProps> = ({
  modes,
  shouldAnimateLedRing,
}) => {
  return (
    <StyledBottomSheet
      className="rounded-t-3xl border border-default-100 bg-default-50 px-4"
      backgroundClassname="bg-transparent"
      handleClassname="p-4"
      handleIndicatorClassname="bg-default-100 h-1 w-1/4 rounded-full"
      enableContentPanningGesture={false}
      enableOverDrag={false}
      enableDynamicSizing={false}
      snapPoints={[32, '75%']}
      onChange={(index) => {
        if (!index) {
          shouldAnimateLedRing.value = true
        } else {
          shouldAnimateLedRing.value = false
        }
      }}
    >
      <BottomSheetView>
        <List modes={modes} />
      </BottomSheetView>
    </StyledBottomSheet>
  )
}
