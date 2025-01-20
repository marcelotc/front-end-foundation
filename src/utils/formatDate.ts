export function formatDate(dateString: string) {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options as any).format(new Date(dateString));
  }