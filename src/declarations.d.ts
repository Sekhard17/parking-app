declare module 'react-datepicker' {
    import * as React from 'react';
  
    export interface DatePickerProps {
      selected: Date | null;
      onChange: (date: Date | null) => void;
      dateFormat?: string;
      locale?: string;
      className?: string;
      // Aquí puedes añadir más props según lo necesites
    }
  
    export default class DatePicker extends React.Component<DatePickerProps> {}
  }
  