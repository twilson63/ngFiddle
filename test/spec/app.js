describe('Controller: fiddleCtrl', function() {

  beforeEach(function(){

  });

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('fiddleCtrl', {
      $scope: scope
    });
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Set defaults', function() {
    it('should define rxchange to medication object', function() {
      expect(scope.rxchange).toBeDefined();
    });

    it ('should set rxchange name to Foo', function(){
      expect(scope.rxchange.name).toEqual('Foo');
    });
