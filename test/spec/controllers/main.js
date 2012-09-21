// 'use strict';

describe('Controller: MainCtrl', function() {

  beforeEach(function(){
    window.rootUrl = '/';
    window.rxchange = {name: 'Foo', dose_forms: [{form_id: "2345", form_description: "capsule", strengths: [{strength_id: "3456", strength_description:"15 mg"},{strength_id: "4567", strength_description:"20 mg"}]}], form_code: "2345", strength_code: "3456"};

  });
  // load the controller's module
  beforeEach(module('ngRxChangeApp'));
  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
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

    it('should define doseForms', function() {
      expect(scope.doseForms).toBeDefined();
    });

    it ('should set set rxchange selectedForm on load', function(){
      expect(scope.selectedForm.form_id).toEqual('2345')
      expect(scope.selectedForm.form_description).toEqual('capsule')
      expect(scope.selectedForm.strengths.length).toEqual(2)
    });

    it ('should set set rxchange selectedStrength on load', function(){
      expect(scope.selectedStrength.strength_id).toEqual('3456')
      expect(scope.selectedStrength.strength_description).toEqual('15 mg')
    });
  });

  describe('medSelected', function() {
    it ('should select a medication', function() {
      spyOn(scope, '$apply')
      var event = {}, ui = { item: { value: 'foo (bar)', id: '111111', generic_name: 'foo', dea_class: 0}};
      scope.medSelected(event, ui);
      expect(scope.rxchange.name).toBe('foo (bar)')
      expect(scope.medSelect).toBeTruthy()
      expect(scope.$apply).toHaveBeenCalled()
    });
  });

  describe('getForms', function() {
    it('should successfully get forms from server', function() {
      $httpBackend.expectGET('/autocompletes/strengths_forms_routes.json?medication=d00308&name=morphine%20(morphine)').respond(200, [{"form_id": "2475", "form_description": "tablet", "strengths": [{"strength_id": "1234", "strength_description":"5 mg"},{"strength_id": "3939", "strength_description":"10 mg"}]}]);
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getForms();
      $httpBackend.flush();
      expect(scope.doseForms[0].strengths[0].strength_id).toBe("1234");
    });

    it('should set formsLoading on success', function() {
      $httpBackend.expectGET('/autocompletes/strengths_forms_routes.json?medication=d00308&name=morphine%20(morphine)').respond(200, [{"form_id": "2475", "form_description": "tablet", "strengths": [{"strength_id": "1234", "strength_description":"5 mg"},{"strength_id": "3939", "strength_description":"10 mg"}]}]);
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getForms();
      expect(scope.formsLoading).toBeTruthy()
      $httpBackend.flush();
      expect(scope.formsLoading).toBeFalsy()
    });

    it('should successfully get forms from server and set doseforms to an empty array', function() {
      $httpBackend.expectGET('/autocompletes/strengths_forms_routes.json?medication=d00308&name=morphine%20(morphine)').respond(200, []);
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getForms();
      $httpBackend.flush();
      expect(scope.doseForms).toEqual([]);
    });

    it('should return error when getting forms from server', function() {
      $httpBackend.expectGET('/autocompletes/strengths_forms_routes.json?medication=d00308&name=morphine%20(morphine)').respond(500);
      spyOn(window, 'alert')
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getForms();
      $httpBackend.flush();
      expect(window.alert).toHaveBeenCalledWith('Error connecting to server.\nCannot load Forms and Strengths.\nPlease try reselecting the medication.')
    });

    it('should set formsLoading on error', function() {
      $httpBackend.expectGET('/autocompletes/strengths_forms_routes.json?medication=d00308&name=morphine%20(morphine)').respond(500);
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getForms();
      expect(scope.formsLoading).toBeTruthy()
      $httpBackend.flush();
      expect(scope.formsLoading).toBeFalsy()
    });
  });

  describe('getSig', function() {
    it('should successfully get sig from server', function() {
      $httpBackend.expectGET('/clinical/sig?medication_code=d00308&name=morphine%20(morphine)&strength_id_and_doseform_id=3456%7C2345').respond(200, {sig: "Take Foo Bar", product_ndc: "12345678910"});
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getSig();
      $httpBackend.flush();
      expect(scope.rxchange.sig).toBe("Take Foo Bar");
      expect(scope.rxchange.product_ndc).toBe("12345678910")
    });

    it('should set sigLoading on success', function() {
      $httpBackend.expectGET('/clinical/sig?medication_code=d00308&name=morphine%20(morphine)&strength_id_and_doseform_id=3456%7C2345').respond(200, {"sig": "Take Foo Bar",});
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getSig();
      expect(scope.sigLoading).toBeTruthy()
      $httpBackend.flush();
      expect(scope.sigLoading).toBeFalsy()
    });

    it('should successfully get sig from server and set sig to null', function() {
      $httpBackend.expectGET('/clinical/sig?medication_code=d00308&name=morphine%20(morphine)&strength_id_and_doseform_id=3456%7C2345').respond(200, {});
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getSig();
      $httpBackend.flush();
      expect(scope.rxchange.sig).toBe(undefined);
    });

    it('should return error when getting sig from server', function() {
      $httpBackend.expectGET('/clinical/sig?medication_code=d00308&name=morphine%20(morphine)&strength_id_and_doseform_id=3456%7C2345').respond(500);
      spyOn(window, 'alert')
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getSig();
      $httpBackend.flush();
      expect(window.alert).toHaveBeenCalledWith('Error connecting to server.\nCannot load Sig.\nPlease try reselecting the strength.')
    });

    it('should set sigLoading on error', function() {
      $httpBackend.expectGET('/clinical/sig?medication_code=d00308&name=morphine%20(morphine)&strength_id_and_doseform_id=3456%7C2345').respond(500);
      scope.rxchange.name = 'morphine (morphine)'
      scope.rxchange.medication_code = 'd00308'
      scope.getSig();
      expect(scope.sigLoading).toBeTruthy()
      $httpBackend.flush();
      expect(scope.sigLoading).toBeFalsy()
    });
  });

  describe('formSelected', function() {
    it('should set form details', function() {
      var selectedForm = {form_id: "1234", form_description: "foo", strengths: []};
      scope.formSelected(selectedForm);
      expect(scope.rxchange.form).toBe("foo");
      expect(scope.rxchange.form_code).toBe("1234");
      expect(scope.selectedStrength).toBeNull();
    })

    it('should set form details to empty', function() {
      scope.formSelected();
      expect(scope.rxchange.form).toBe("");
      expect(scope.rxchange.form_code).toBe("");
      expect(scope.selectedStrength).toBeNull();
    })
  });

  describe('strengthSelected', function() {
    it('should set strength details', function() {
      spyOn(scope, 'getSig');
      var selectedStrength = {strength_id: "4321", strength_description: "bar"};
      scope.strengthSelected(selectedStrength);
      expect(scope.rxchange.strength).toBe("bar");
      expect(scope.rxchange.strength_code).toBe("4321");
      expect(scope.getSig).toHaveBeenCalled();
    })

    it('should set strength details to empty', function() {
      scope.strengthSelected();
      expect(scope.rxchange.strength).toBe("");
      expect(scope.rxchange.strength_code).toBe("");
      expect(scope.rxchange.sig).toBe("");
    })
  });
});
