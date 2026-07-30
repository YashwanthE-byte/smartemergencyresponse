export const getDashboardAnalytics = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      metrics: {
        totalEmergencyCallsToday: 42,
        activeSOSIncidents: 3,
        averageResponseTimeMinutes: 4.8,
        ambulancesAvailable: 14,
        ambulancesDispatched: 5,
        hospitalBedsAvailable: 114,
        icuBedsAvailable: 19
      },
      recentIncidents: [
        { id: 'SOS-901', type: 'Cardiac Emergency', status: 'En Route', time: '10 mins ago', location: '7th Avenue Main St' },
        { id: 'SOS-902', type: 'Motor Accident', status: 'Dispatched', time: '22 mins ago', location: 'Highway 101 KM 14' },
        { id: 'SOS-903', type: 'Severe Allergy', status: 'Resolved', time: '1 hour ago', location: 'Oakridge Residential Park' }
      ]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
